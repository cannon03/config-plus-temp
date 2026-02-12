<script lang="ts">
	import switchIcon from '$lib/assets/keypad_switch.svg';
	import type { KeypadInputResponse } from '$lib/types/keypadkey';
	import { Info } from 'lucide-svelte';
	import KeypadKeyInfoModal from '../composed/modals/KeypadKeyInfoModal.svelte';
	import type { KeypadKeyActionResponse } from '$lib/types/key_action';
	import SceneForm from '../composed/forms/SceneForm.svelte';
	import KeyInputNameForm from '../composed/forms/KeyInputNameForm.svelte';
	import Modal from '../composed/modals/Modal.svelte';
	import { SCENE_FORM_TYPES } from '$lib/constants/scene';
	import type { Unit } from '$lib/types/unit';
	import type { RoomResponse } from '$lib/types/room';
	import type { KeypadResponse } from '$lib/types/keypad';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { LoadResponse } from '$lib/types/load';
	import { getDashboardContext } from '$lib/context/dashboard';

	const {
		keypad,
		keypadKey,
		allZones,
		allRooms,
		selectedRoom,
		selectedZone,
		keyActions,
		buttonSize
	}: {
		keypad: KeypadResponse;
		keypadKey: KeypadInputResponse;
		allZones: Array<ZoneResponse>;
		allRooms: Array<RoomResponse>;
		selectedRoom: RoomResponse;
		selectedZone: ZoneResponse;
		keyActions: Array<KeypadKeyActionResponse>;
		buttonSize: number;
	} = $props();

	const ctx = getDashboardContext();
	let showKeypadEditModal = $state(false);
	let showModal = $state(false);
	const existingKeyActions = $derived.by(() => keyActions.filter((ka) => ka.key === keypadKey.id));

	const actionEventTypesTooltip = $derived.by(() => {
		if (keypadKey.actions.length === 0) return '';
		const uniqueTypes = [...new Set(keypadKey.actions.map((a) => a.event_type))];
		return uniqueTypes.join(', ');
	});

	let sceneModalKey = $state(0);

	function showSceneModal() {
		sceneModalKey++;
		showModal = true;
	}
</script>

<Modal bind:showModal={showKeypadEditModal} title="Rename Key">
	<KeyInputNameForm bind:showModal={showKeypadEditModal} keyInput={keypadKey} />
</Modal>

{#key sceneModalKey}
	<Modal bind:showModal title={SCENE_FORM_TYPES.CREATE}>
		<SceneForm
			bind:showModal
			unit={ctx.domainGraph.unit}
			input={keypad}
			inputKey={keypadKey}
			{allZones}
			{allRooms}
			room={selectedRoom}
			zone={selectedZone}
		/>
	</Modal>
{/key}

<div class="relative flex flex-col items-center justify-center">
	<!-- Main key button -->
	<button
		type="button"
		title="Configure key"
		class="group relative flex h-{buttonSize} w-{buttonSize} items-center justify-center rounded-xl shadow-md transition hover:scale-105 hover:cursor-pointer hover:shadow-lg"
		onclick={showSceneModal}
	>
		<img src={switchIcon} alt="Switch" class="transition group-hover:brightness-75" />
		{#if keypadKey.actions.length > 0}
			<div
				class="absolute -top-2 -right-2 h-4 w-4 rounded-full border border-white bg-green-500 shadow-md"
				title={actionEventTypesTooltip}
			></div>
		{/if}
	</button>

	<!-- Key label -->
	<button
		onclick={() => {
			showKeypadEditModal = true;
			console.log('Show keypad edit modal', showKeypadEditModal);
		}}
		class="mt-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white shadow-sm hover:cursor-pointer"
	>
		{keypadKey.name == '' || !keypadKey.name ? 'Key ' + keypadKey.key_index : keypadKey.name}
	</button>

	<!-- Green status indicator -->
</div>
