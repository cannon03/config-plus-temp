<script lang="ts">
	// (same script as before \u2014 untouched)
	import { SCENE_FORM_CONTROL_SCOPES, SCENE_PRESETS, SCENE_PRIORITY } from '$lib/constants/scene';
	import type { KeypadResponse } from '$lib/types/keypad';
	import type { KeypadKeyResponse } from '$lib/types/keypadkey';
	import type { RoomResponse } from '$lib/types/room';
	import type { SceneFormControlScopeValue, ScenePreset, SceneRequest } from '$lib/types/scene';
	import type { Unit } from '$lib/types/unit';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { LoadResponse } from '$lib/types/load';
	import type { SceneLoadData, SceneLoadRequest } from '$lib/types/scene_load';
	import Modal from '../modals/Modal.svelte';
	import CheckMarkAnimation from '$lib/components/animations/CheckMarkAnimation.svelte';

	import type { KEY_ACTIONE_TYPE_VALUE, KeyActionRequest } from '$lib/types/key_action';
	import { createScene } from '$lib/api/scene';
	import { createSceneLoads } from '$lib/api/scene_load';
	import { SCENE_LOAD_DELAY_MS, SCENE_LOAD_FADE_MS } from '$lib/constants/scene_load';
	import { KEY_ACTION_STATES, KEY_ACTION_TYPES, KEY_EVENT_TYPES } from '$lib/constants/key_action';
	import { createKeyAction } from '$lib/api/key_action';
	import { tick } from 'svelte';
	import SceneLoadsManager from '../lists/SceneLoadsManager.svelte';
	import SceneLoadsSelectorCard from '../cards/SceneLoadsSelectorCard.svelte';
	import ControlScopeSelectorCard from '../cards/ControlScopeSelectorCard.svelte';
	import ScenePresetSelectorCard from '../cards/ScenePresetSelectorCard.svelte';
	import KeyActionSelectorCard from '../cards/KeyActionSelectorCard.svelte';
	import { MODAL_RETURN_TYPES } from '$lib/constants/modal';

	let {
		unit,
		allRooms,
		keypadKey,
		keyPad,
		zones,
		loads,
		showModal = $bindable(false)
	}: {
		unit: Unit;
		keypadKey: KeypadKeyResponse;
		keyPad: KeypadResponse;
		zones: Array<ZoneResponse>;
		allRooms: Array<RoomResponse>;
		loads: Array<LoadResponse>;
		showModal?: boolean;
	} = $props();

	let controlScope = $state<SceneFormControlScopeValue>(SCENE_FORM_CONTROL_SCOPES.ROOM.value);

	let selectedRoomId = $state(keyPad.location_room);
	let selectedZoneId = $state(
		zones.find((zone) => zone.id === allRooms.find((r) => r.id === keyPad.location_room)!.zone)!.id
	);

	let sceneLoads = $state<Array<SceneLoadData>>([]);
	let showSuccessModal = $state(false);

	const selectedRoom = $derived.by(() => allRooms.find((room) => room.id === selectedRoomId)!);
	const selectedZone = $derived.by(() => zones.find((zone) => zone.id === selectedZoneId)!);

	let selectedLoad = $state<LoadResponse | null>(null);

	let selectedKeyAction = $state<KEY_ACTIONE_TYPE_VALUE>(KEY_EVENT_TYPES.on.value);

	let selectedPreset = $state<ScenePreset>(SCENE_PRESETS.all_on);

	let scopeId = $derived.by(() => {
		if (controlScope === SCENE_FORM_CONTROL_SCOPES.ROOM.value) return selectedRoom.id;
		if (controlScope === SCENE_FORM_CONTROL_SCOPES.ZONE.value) return selectedZone.id;
		if (controlScope === SCENE_FORM_CONTROL_SCOPES.ALL.value) return unit.id;
		return 0;
	});

	let sceneName = $state(keypadKey.name ?? `Key ${keypadKey.key_number}`);

	let sceneRequest = $derived.by<SceneRequest>(() => ({
		unit: unit.id,
		name: sceneName,
		scope: SCENE_FORM_CONTROL_SCOPES[controlScope].scope,
		scope_id: scopeId,
		priority: SCENE_PRIORITY
	}));

	let availiableLoads = $derived.by(() => {
		if (controlScope === SCENE_FORM_CONTROL_SCOPES.ROOM.value)
			return loads.filter((load) => load.room === selectedRoom.id);
		if (controlScope === SCENE_FORM_CONTROL_SCOPES.ZONE.value) {
			const zoneRooms = allRooms.filter((room) => room.zone === selectedZone.id);
			return loads.filter((load) => zoneRooms.some((room) => room.id === load.room));
		}
		return loads;
	});

	let modalReturnType = $state(MODAL_RETURN_TYPES.cancel);

	async function createPreset() {
		for (const load of sceneLoads) {
			const value = selectedPreset.values[load.load_type];
			load.value = value;
		}
	}

	async function saveScene() {
		const scene = await createScene(sceneRequest);
		const sceneLoadsRequests = sceneLoads.map((load) => {
			return <SceneLoadRequest>{
				scene: scene.id,
				load: load.load_id,
				value: load.value,
				fade_ms: SCENE_LOAD_FADE_MS,
				delay_ms: SCENE_LOAD_DELAY_MS
			};
		});

		await createSceneLoads(sceneLoadsRequests);

		await createKeyAction(<KeyActionRequest>{
			key: keypadKey.id,
			event_type: selectedKeyAction,
			action_type: KEY_ACTION_TYPES.scene,
			action_target: scene.id,
			state: KEY_ACTION_STATES.user
		});

		showSuccessModal = true;
	}

	async function onClosed() {
		await tick();
		if (modalReturnType === MODAL_RETURN_TYPES.confirm) {
			selectedPreset = SCENE_PRESETS.all_off;
			selectedKeyAction = KEY_EVENT_TYPES.off.value;
			showModal = true;
			createPreset();
			modalReturnType = MODAL_RETURN_TYPES.close;
		} else {
			showModal = false;
		}
	}
</script>

<Modal title="Success" bind:showModal={showSuccessModal} {onClosed}>
	<div class="flex flex-col items-center justify-center gap-6 p-6 text-center">
		<!-- Animated checkmark -->
		<CheckMarkAnimation />

		<!-- Success message -->
		<p class="text-base font-medium text-gray-800">Scene was created successfully!</p>

		<!-- Secondary action (create off loads) -->
		{#if selectedPreset.key !== SCENE_PRESETS.all_off.key}
			<div class="space-y-3">
				<p class="text-sm text-gray-600">
					Would you like to create corresponding <span class="font-medium text-gray-800">“Off”</span
					> loads for this preset?
				</p>

				<div class="flex justify-center gap-3">
					<button
						onclick={() => {
							// selectedPreset = SCENE_PRESETS.all_off;
							// selectedKeyAction = KEY_EVENT_TYPES.off.value;
							// showModal = true;
							// showSuccessModal = false;
							// createPreset();

							modalReturnType = MODAL_RETURN_TYPES.confirm;
							showSuccessModal = false;
						}}
						class="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
					>
						Yes, create off loads
					</button>
					<button
						onclick={() => (showSuccessModal = false)}
						class="rounded-md bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
					>
						No, thanks
					</button>
				</div>
			</div>
		{/if}
	</div>
</Modal>

<div
	class="mx-auto flex h-[75vh] w-[70vw] max-w-6xl flex-col rounded-2xl bg-white p-8 text-gray-800"
>
	<!-- Main Body -->
	<div class="flex flex-1 gap-10 overflow-y-auto">
		<!-- Left Column -->
		<div class="flex w-1/2 flex-col gap-8">
			<!-- Scene Name -->
			<div class="space-y-2">
				<label for="name" class="text-sm font-medium text-gray-700">Scene Name</label>
				<input
					type="text"
					bind:value={sceneName}
					id="name"
					placeholder="Enter scene name..."
					class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<!-- Control Scope -->
			<ControlScopeSelectorCard
				bind:controlScope
				bind:selectedRoomId
				bind:selectedZoneId
				bind:sceneLoads
				{availiableLoads}
				keypad={keyPad}
				{allRooms}
				{zones}
				{unit}
			/>

			<!-- Load Selection -->
			<SceneLoadsSelectorCard bind:selectedLoad bind:sceneLoads {availiableLoads} />

			<!-- Presets -->
			<ScenePresetSelectorCard bind:selectedPreset {createPreset} />

			<!-- Key State -->
			<KeyActionSelectorCard bind:selectedKeyAction />
		</div>

		<!-- Right Column -->
		<div class="flex w-1/2 flex-col gap-6">
			<SceneLoadsManager bind:sceneLoads />
		</div>
	</div>

	<!-- Footer -->
	<div class="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
		<button
			class="rounded-md bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
			>Cancel</button
		>
		<button
			class="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
			onclick={saveScene}
		>
			Save Scene
		</button>
	</div>
</div>
