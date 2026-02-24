<script lang="ts">
	import { KEY_EVENT_TYPES, KEY_ACTION_TYPES, KEY_ACTION_STATES } from '$lib/constants/key_action';
	import {
		SCENE_FORM_CONTROL_SCOPES,
		SCENE_FORM_TYPES,
		SCENE_PRESETS,
		SCENE_PRIORITY
	} from '$lib/constants/scene';
	import { SCENE_LOAD_FADE_MS, SCENE_LOAD_DELAY_MS } from '$lib/constants/scene_load';
	import type {
		KEY_ACTIONE_TYPE_VALUE,
		KeypadKeyActionResponse,
		KeyActionRequest
	} from '$lib/types/key_action';
	import type { KeyInput } from '$lib/types/key_input';
	import type { LoadResponse } from '$lib/types/load';
	import type {
		SceneFormControlScopeValue,
		ScenePreset,
		SceneRequest,
		SceneResponse
	} from '$lib/types/scene';
	import type { SceneLoadData, SceneLoadRequest } from '$lib/types/scene_load';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { Unit } from '$lib/types/unit';
	import type { InputResponse } from '$lib/types/input';
	import type { SceneFormType } from '$lib/types/scene';
	import { createScene, updateScene } from '$lib/api/scene';
	import { createSceneLoads, deleteSceneLoad, updateSceneLoad } from '$lib/api/scene_load';
	import { createKeyAction, updateKeyAction } from '$lib/api/key_action';
	import SceneLoadsManager from '../lists/SceneLoadsManager.svelte';
	import SceneLoadsSelectorCard from '../cards/SceneLoadsSelectorCard.svelte';
	import ScenePresetSelectorCard from '../cards/ScenePresetSelectorCard.svelte';
	import ControlScopeSelectorCard from '../cards/ControlScopeSelectorCard.svelte';

	let {
		keyInput,
		keyInputScenes,
		zones,
		unit,
		input,
		showModal = $bindable(false)
	}: {
		keyInput: KeyInput;
		keyInputScenes: Array<SceneResponse>;
		zones: Array<ZoneResponse>;
		unit: Unit;
		input: InputResponse;
		showModal?: boolean;
	} = $props();

	let selectedKeyEvent = $state<KEY_ACTIONE_TYPE_VALUE>(KEY_EVENT_TYPES.on.value);

	let formType = $derived.by(() => {
		if (keyInput.actions.length === 0) return SCENE_FORM_TYPES.CREATE;
		return SCENE_FORM_TYPES.EDIT;
	});

	let currentKeyAction: KeypadKeyActionResponse | undefined = $derived.by(() => {
		const allKeyActions = keyInput.actions;
		return allKeyActions.find((a) => a.event_type === selectedKeyEvent);
	});

	let selectedScene: SceneResponse | undefined = $derived.by(() => {
		if (!currentKeyAction) return undefined;
		return keyInputScenes.find((s) => s.id === currentKeyAction?.action_target);
	});

	let sceneName = $derived(selectedScene?.name ?? '');

	// UI State for Creating/Editing Scene
	let selectedScope: SceneFormControlScopeValue = $state(SCENE_FORM_CONTROL_SCOPES.ROOM.value);
	let selectedRoomId = $state<number>(0);
	let selectedZoneId = $state<number>(0);

	let selectedLoad = $state<LoadResponse | null>(null);
	let selectedPreset = $state<ScenePreset>(SCENE_PRESETS.all_on);

	const allRooms = $derived.by(() => zones.flatMap((z) => z.rooms));
	const allLoads = $derived.by(() => allRooms.flatMap((r) => r.loads));

	// Derived Selected Objects
	const selectedRoom = $derived.by(() => allRooms.find((r) => r.id === selectedRoomId));
	const selectedZone = $derived.by(() => zones.find((z) => z.id === selectedZoneId));

	let availiableLoads = $derived.by(() => {
		if (selectedScope === SCENE_FORM_CONTROL_SCOPES.ROOM.value && selectedRoom) {
			return selectedRoom?.loads;
		} else if (selectedScope === SCENE_FORM_CONTROL_SCOPES.ZONE.value && selectedZone) {
			const zoneLoads = selectedZone.rooms.flatMap((r) => r.loads);
			return zoneLoads;
		} else {
			return allLoads;
		}
	});

	let sceneLoads = $state<SceneLoadData[]>([]);

	$effect(() => {
		if (!selectedScene) {
			sceneLoads = [];
			return;
		}

		sceneLoads = selectedScene.scene_loads.reduce<SceneLoadData[]>((acc, sl) => {
			const loadObj = allLoads.find((l) => l.id === sl.load_id);

			if (loadObj) {
				let sceneLoad = {
					load_id: sl.load_id,
					load_type: loadObj.load_type,
					value: sl.value,
					name: loadObj.name
				};
				acc.push(sceneLoad);
			}
			return acc;
		}, []);
	});

	// --- Actions ---

	let scopeId = $derived.by(() => {
		if (selectedScope === SCENE_FORM_CONTROL_SCOPES.ROOM.value) return selectedRoomId;
		if (selectedScope === SCENE_FORM_CONTROL_SCOPES.ZONE.value) return selectedZoneId;
		return unit.id;
	});

	let sceneRequest = $derived.by<SceneRequest>(() => ({
		unit: unit.id,
		name: sceneName || `Key ${keyInput.key_index}`,
		scope: SCENE_FORM_CONTROL_SCOPES[selectedScope].scope,
		scope_id: scopeId,
		priority: SCENE_PRIORITY
	}));

	// Preset Logic
	async function createPreset() {
		for (const load of sceneLoads) {
			const value = selectedPreset.values[load.load_type];
			if (value !== undefined) load.value = value;
		}
	}

	function buildSceneLoadRequests(sceneId: number): SceneLoadRequest[] {
		return sceneLoads.map((load) => ({
			scene: sceneId,
			load: load.load_id,
			value: load.value,
			fade_ms: SCENE_LOAD_FADE_MS,
			delay_ms: SCENE_LOAD_DELAY_MS
		}));
	}

	async function handleCreateScene() {
		const scene = await createScene(sceneRequest);

		await createSceneLoads(buildSceneLoadRequests(scene.id));

		await createKeyAction({
			key: keyInput.id,
			event_type: selectedKeyEvent,
			action_type: KEY_ACTION_TYPES.scene,
			action_target: scene.id,
			state: KEY_ACTION_STATES.user
		} as KeyActionRequest);

		showModal = false;
	}

	async function handleEditScene() {
		if (!selectedScene || !currentKeyAction) return;

		// 1. Update the scene itself
		await updateScene(selectedScene.id, sceneRequest);

		// 2. Delete old scene loads that were removed
		const currentLoadIds = new Set(sceneLoads.map((sl) => sl.load_id));
		const removedLoads = selectedScene.scene_loads.filter((sl) => !currentLoadIds.has(sl.load_id));
		for (const removed of removedLoads) {
			await deleteSceneLoad(removed.id);
		}

		// 3. Create new scene loads (ones not in the original)
		const existingLoadIds = new Set(selectedScene.scene_loads.map((sl) => sl.load_id));
		const newLoads = sceneLoads.filter((sl) => !existingLoadIds.has(sl.load_id));
		if (newLoads.length > 0) {
			const newRequests: SceneLoadRequest[] = newLoads.map((load) => ({
				scene: selectedScene!.id,
				load: load.load_id,
				value: load.value,
				fade_ms: SCENE_LOAD_FADE_MS,
				delay_ms: SCENE_LOAD_DELAY_MS
			}));
			await createSceneLoads(newRequests);
		}

		// 4. Update existing scene loads
		for (const currentLoad of sceneLoads) {
			const existingLoad = selectedScene.scene_loads.find(
				(sl) => sl.load_id === currentLoad.load_id
			);
			if (existingLoad && currentLoad.value !== existingLoad.value) {
				await updateSceneLoad(existingLoad.id, {
					value: currentLoad.value,
					fade_ms: SCENE_LOAD_FADE_MS,
					delay_ms: SCENE_LOAD_DELAY_MS
				});
			}
		}
		// 4. Update the key action target if needed
		await updateKeyAction(currentKeyAction.id, {
			event_type: selectedKeyEvent,
			action_type: KEY_ACTION_TYPES.scene,
			action_target: selectedScene.id,
			state: KEY_ACTION_STATES.user
		} as Partial<KeyActionRequest>);

		showModal = false;
	}

	async function saveScene() {
		console.log(
			'SAVING SCENE:',
			$state.snapshot(sceneRequest),
			$state.snapshot(sceneLoads),
			$state.snapshot(formType.value),
			$state.snapshot(currentKeyAction)
		);
		if (!currentKeyAction) {
			await handleCreateScene();
		} else {
			await handleEditScene();
		}
	}
</script>

<div class="flex h-[80vh] w-[85vw] min-w-[1000px] flex-col overflow-hidden bg-gray-50">
	<!-- Top Tabs for Key Action (On/Off) -->
	<header class="z-10 bg-white shadow-sm">
		<nav class="flex border-b border-gray-200" aria-label="Tabs">
			{#each Object.entries(KEY_EVENT_TYPES) as [_, action]}
				<button
					class={`group relative min-w-0 flex-1 overflow-hidden py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none ${
						selectedKeyEvent === action.value
							? 'text-blue-600'
							: 'text-gray-500 hover:text-gray-700'
					}`}
					onclick={() => (selectedKeyEvent = action.value)}
				>
					<span>{action.label} Action</span>
					<span
						aria-hidden="true"
						class={`absolute inset-x-0 bottom-0 h-0.5 ${
							selectedKeyEvent === action.value ? 'bg-blue-600' : 'bg-transparent'
						}`}
					></span>
				</button>
			{/each}
		</nav>
	</header>

	<!-- Main Content Area -->
	<div class="flex flex-1 gap-8 overflow-hidden p-8">
		<!-- Left Column: Configuration -->
		<div
			class="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 flex w-1/3 min-w-[450px] flex-col gap-6 overflow-y-auto pr-4"
		>
			<!-- Context Header -->
			<div class="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
				<h2 class="text-xl font-bold text-blue-900">
					{KEY_EVENT_TYPES[selectedKeyEvent].label} Scene Configuration
				</h2>
				<p class="mt-2 text-base text-blue-700">
					Define the behavior when the key is {selectedKeyEvent === 'on' ? 'pressed' : 'released'}.
				</p>
			</div>

			<div class="space-y-6">
				<!-- Scene Name -->
				<section>
					<label for="name" class="mb-1.5 block text-sm font-medium text-gray-700">Scene Name</label
					>
					<div class="relative rounded-md shadow-sm">
						<input
							type="text"
							bind:value={sceneName}
							id="name"
							class="block w-full rounded-md border-0 bg-white py-2 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
							placeholder="Scene Name (Auto-generated)"
						/>
					</div>
				</section>

				<!-- Control Scope -->
				<ControlScopeSelectorCard
					bind:controlScope={selectedScope}
					bind:selectedRoomId
					bind:selectedZoneId
					bind:sceneLoads
					{availiableLoads}
					{input}
					{allRooms}
					{zones}
					{unit}
				/>

				<div class="my-2 h-px bg-gray-200"></div>

				<!-- Load Selection -->
				<SceneLoadsSelectorCard bind:selectedLoad bind:sceneLoads {availiableLoads} />

				<div class="my-2 h-px bg-gray-200"></div>

				<!-- Presets -->
				<ScenePresetSelectorCard bind:selectedPreset {createPreset} />
			</div>
		</div>

		<!-- Right Column: List of Loads -->
		<div
			class="flex flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
		>
			<SceneLoadsManager bind:sceneLoads />
		</div>
	</div>

	<!-- Footer -->
	<div class="flex items-center justify-end gap-4 border-t border-gray-200 bg-white px-8 py-5">
		<button
			onclick={() => (showModal = false)}
			class="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
		>
			Cancel
		</button>
		<button
			class="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			onclick={saveScene}
		>
			{formType.value === 'CREATE' ? 'Create Scene' : 'Save Changes'}
		</button>
	</div>
</div>
