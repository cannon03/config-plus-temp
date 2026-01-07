<script lang="ts">
	import { KEYPAD_TYPES } from '$lib/constants/keypad';
	import backgroundImage from '$lib/assets/keypad_background.svg';
	import type { KeypadKeyResponse } from '$lib/types/keypadkey';
	import KeypadKeyButton from '$lib/components/buttons/KeypadKeyButton.svelte';
	import type { KeypadKeyActionResponse } from '$lib/types/key_action';
	import type { Unit } from '$lib/types/unit';
	import type { RoomResponse } from '$lib/types/room';
	import type { KeypadResponse } from '$lib/types/keypad';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { LoadResponse } from '$lib/types/load';

	const {
		keypadKeys,
		keyActions,
		unit,
		allRooms,
		keyPad,
		zones,
		loads,
		type
	}: {
		keypadKeys: Array<KeypadKeyResponse>;
		keyActions: Array<KeypadKeyActionResponse>;
		unit: Unit;
		keyPad: KeypadResponse;
		zones: Array<ZoneResponse>;
		allRooms: Array<RoomResponse>;
		loads: Array<LoadResponse>;
		type: (typeof KEYPAD_TYPES)[keyof typeof KEYPAD_TYPES];
	} = $props();

	const { rows, cols, layout } = $derived.by(() => type);
	const keyMap = $derived.by(() => new Map(layout.map((k) => [`${k.row},${k.col}`, k])));
	const buttonSize = 20;

	$effect(() => {
		console.log('BUTTON SIZE', $state.snapshot(buttonSize));
	});
</script>

<!-- Main keypad container -->
<div
	class="relative m-auto aspect-square w-80 rounded-2xl bg-gray-50 shadow-lg"
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
				{@const keypadKey = keypadKeys.find((k) => k.key_number === map_obj?.key_id)}
				{#if keypadKey}
					<KeypadKeyButton
						{unit}
						{zones}
						{loads}
						{allRooms}
						{keyPad}
						{buttonSize}
						{keyActions}
						{keypadKey}
					/>
				{:else}
					<div class="h-{buttonSize} w-{buttonSize}"></div>
				{/if}
			{/each}
		{/each}
	</div>
</div>
