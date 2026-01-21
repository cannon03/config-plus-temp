<script lang="ts">
	import backgroundImage from '$lib/assets/logicboard_background.svg';
	import type { LOGICBOARD_TYPES } from '$lib/constants/logic_board';
	import LogicBoardKeyImage from '$lib/assets/logicboard_key.svg';

	const {
		type
	}: {
		type: (typeof LOGICBOARD_TYPES)[keyof typeof LOGICBOARD_TYPES];
	} = $props();

	const { rows, cols, layout } = $derived.by(() => type);
	const keyMap = $derived.by(() => new Map(layout.map((k) => [`${k.row},${k.col}`, k])));
	const buttonSize = 35;
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
		class="absolute inset-0 grid place-items-center gap-4 p-6"
		style={`grid-template-rows:repeat(${rows},1fr);
				grid-template-columns:repeat(${cols},1fr);`}
	>
		{#each Array(rows) as _, r}
			{#each Array(cols) as _, c}
				{@const map_obj = keyMap.get(`${r + 1},${c + 1}`)}
				{#if map_obj}
					<button
						type="button"
						title="Configure key"
						style="width: {buttonSize}px; height: {buttonSize}px"
						class="group relative flex items-center justify-center rounded-xl shadow-md transition hover:scale-105 hover:cursor-pointer hover:shadow-lg"
					>
						<img
							src={LogicBoardKeyImage}
							alt="Switch"
							class="transition group-hover:brightness-75"
						/>
					</button>
				{:else}
					<div style="width: {buttonSize}px; height: {buttonSize}px"></div>
				{/if}
			{/each}
		{/each}
	</div>
</div>
