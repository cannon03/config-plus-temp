<script lang="ts">
	import { KEYPAD_TYPES } from '$lib/constants/keypad';
	import backgroundImage from '$lib/assets/keypad_background.svg';
	import corridorPanelImage from '$lib/assets/corridor-panel.svg';
	import type { KeypadInputResponse, KeypadKeyResponse } from '$lib/types/keypadkey';
	import KeypadKeyButton from '$lib/components/buttons/KeypadKeyButton.svelte';
	import type { KeypadKeyActionResponse } from '$lib/types/key_action';
	import type { Unit } from '$lib/types/unit';
	import type { RoomResponse } from '$lib/types/room';
	import type { KeypadResponse } from '$lib/types/keypad';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { LoadResponse } from '$lib/types/load';
	import Modal from '../modals/Modal.svelte';
	import { SCENE_FORM_TYPES } from '$lib/constants/scene';
	import SceneForm from '../forms/SceneForm.svelte';
	import { getDashboardContext } from '$lib/context/dashboard';

	const {
		keypad,
		type
	}: {
		keypad: KeypadResponse;

		type: (typeof KEYPAD_TYPES)[keyof typeof KEYPAD_TYPES];
	} = $props();

	const ctx = getDashboardContext();

	const keypadKeys = $derived.by(() => keypad.inputs);

	const { rows, cols, layout } = $derived.by(() => type);
	const keyMap = $derived.by(() => new Map(layout.map((k) => [`${k.row},${k.col}`, k])));
	const buttonSize = $derived.by(() => (keypadKeys.length > 4 ? 12 : 20));
	const isCorridor = $derived(keypad.sub_type === 'corridor');
	const fourthKey = $derived(keypadKeys.find((k) => k.key_index === 4));

	let showModal = $state(false);
	let sceneModalKey = $state(0);
</script>

{#if isCorridor}
	<!-- Corridor Panel Display -->
	<!-- {#if fourthKey}
		{#key sceneModalKey}
			<Modal bind:showModal title={SCENE_FORM_TYPES.CREATE.label}>
				<SceneForm
					bind:showModal
					unit={ctx.domainGraph.unit}
					input={keypad}
					inputKey={fourthKey}
					{allZones}
					{allRooms}
					room={selectedRoom}
					zone={selectedZone}
				/>
			</Modal>
		{/key}
	{/if} -->
	<div class="relative m-auto w-80 overflow-hidden rounded-2xl bg-muted shadow-lg">
		<button>
			<img src={corridorPanelImage} alt="Corridor Panel" class="h-auto w-full object-contain" />
		</button>
	</div>
{:else}
	<!-- Main keypad container -->
	<div
		class="relative m-auto aspect-square w-80 rounded-2xl bg-muted shadow-lg"
		style={`background-image:url('${backgroundImage}');
				background-size:contain;
				background-repeat:no-repeat;
				background-position:center;`}
	>
		<!-- Grid overlay -->
		<div
			class="absolute inset-0 grid gap-4 p-6"
			style={`grid-template-rows:repeat(${rows},1fr);
					grid-template-columns:repeat(${cols},1fr);
					`}
		>
			{#each Array(rows) as _, r}
				{#each Array(cols) as _, c}
					{@const map_obj = keyMap.get(`${r + 1},${c + 1}`)}
					{@const keypadKey = keypadKeys.find((k) => k.key_index === map_obj?.key_id)}
					{#if keypadKey}
						<KeypadKeyButton {keypad} {buttonSize} {keypadKey} />
					{:else}
						<div class="h-{buttonSize} w-{buttonSize}"></div>
					{/if}
				{/each}
			{/each}
		</div>
	</div>
{/if}
