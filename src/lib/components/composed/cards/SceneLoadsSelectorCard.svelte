<script lang="ts">
	import type { LoadResponse } from '$lib/types/load';
	import type { SceneLoadData } from '$lib/types/scene_load';
	import { LOAD_TYPES } from '$lib/constants/load';

	let {
		selectedLoad = $bindable(),
		sceneLoads = $bindable([]),
		availiableLoads
	}: {
		selectedLoad: LoadResponse | null;
		availiableLoads: Array<LoadResponse>;
		sceneLoads: Array<SceneLoadData>;
	} = $props();

	function addLoadToScene() {
		if (selectedLoad) {
			sceneLoads.push({
				name: selectedLoad.name,
				load_id: selectedLoad.id,
				value: 0,
				load_type: selectedLoad.load_type
			});
			selectedLoad = null;
		}
	}
</script>

<!-- Load Selection -->
<section class="space-y-3">
	<h3 class="text-base font-semibold text-gray-900">Load Selection</h3>
	<label for="load-select" class="block text-sm font-medium text-gray-600">Add Loads to Scene</label
	>
	<select
		id="load-select"
		bind:value={selectedLoad}
		class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
	>
		{#each availiableLoads as load}
			<option value={load}>{load.name}</option>
		{/each}
	</select>

	<!-- Selected Load Preview -->
	{#if selectedLoad}
		{@const loadData = LOAD_TYPES[selectedLoad.load_type]}
		{@const LoadIcon = loadData.icon}
		{@const loadLabel = loadData.label}
		<div class="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
			<div class="mb-4 flex items-center gap-3">
				<LoadIcon class="h-5 w-5 text-gray-700" />
				<div>
					<div class="text-sm font-semibold text-gray-900">{selectedLoad.name}</div>
					<div class="text-xs text-gray-500">{loadLabel}</div>
				</div>
			</div>
			<div class="flex gap-3">
				<button
					onclick={addLoadToScene}
					class="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
				>
					Add to Scene
				</button>
				<button
					onclick={() => (selectedLoad = null)}
					class="flex-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
				>
					Cancel
				</button>
			</div>
		</div>
	{/if}
</section>
