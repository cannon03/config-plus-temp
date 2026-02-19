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
		availiableLoads: Array<LoadResponse> | [];
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

<div class="space-y-3">
	<div class="flex items-center justify-between">
		<h3 class="text-sm font-semibold text-gray-900">Individual Loads</h3>
	</div>

	<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
		<label
			for="load-select"
			class="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase"
		>
			Add Single Load
		</label>
		<div class="flex gap-2">
			<div class="relative flex-1">
				<select
					id="load-select"
					bind:value={selectedLoad}
					class="block w-full rounded-md border-0 py-2 pr-10 pl-3 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
				>
					<option value={null}>Select a load to add...</option>
					{#each availiableLoads ?? [] as load}
						<option value={load}>{load.name} ({load.load_type})</option>
					{/each}
				</select>
			</div>

			<button
				disabled={!selectedLoad}
				onclick={addLoadToScene}
				class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
			>
				Add
			</button>
		</div>
	</div>
</div>
