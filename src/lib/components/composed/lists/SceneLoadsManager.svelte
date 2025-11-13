<script lang="ts">
	import { LOAD_TYPES } from '$lib/constants/load';
	import type { SceneLoadData } from '$lib/types/scene_load';
	import { Expand, ListCollapse, Trash2, Zap, ZapOff } from 'lucide-svelte';

	let {
		sceneLoads = $bindable([])
	}: {
		sceneLoads: Array<SceneLoadData>;
	} = $props();

	function clearSceneLoads() {
		sceneLoads = [];
	}

	function deleteSceneLoad(id: number) {
		sceneLoads = sceneLoads.filter((load) => load.load_id !== id);
	}
</script>

<div>
	<section class="space-y-4">
		<div class="flex items-center justify-between p-4">
			<h3 class="text-base font-semibold text-gray-900">Scene View</h3>
			<button
				onclick={clearSceneLoads}
				class="flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-700"
			>
				<Trash2 class="h-4 w-4" /> Clear All
			</button>
		</div>
		<p class="text-sm text-gray-600">Adjust load levels for this scene</p>

		<div class="space-y-4">
			{#each sceneLoads as load}
				{@const loadData = LOAD_TYPES[load.load_type]}
				{@const LoadIcon = loadData.icon}
				<div
					class="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:bg-gray-100"
				>
					<div class="mb-3 flex items-center justify-between">
						<div class="flex items-center gap-3">
							<LoadIcon class="h-5 w-5 text-gray-700" />
							<div>
								<div class="text-sm font-semibold text-gray-900">{load.name}</div>
								<div class="text-xs text-gray-500">{loadData.label}</div>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-sm font-medium text-gray-700">{load.value}%</span>
							<button onclick={() => deleteSceneLoad(load.load_id)}>
								<Trash2 class="h-4 w-4 text-red-400 transition hover:text-red-600" />
							</button>
						</div>
					</div>

					{#if loadData.control === 'percentage'}
						<input
							type="range"
							bind:value={load.value}
							min="0"
							max="100"
							class="w-full cursor-pointer accent-blue-600"
						/>
					{:else if loadData.control === 'toggle'}
						<div class="flex gap-3">
							<button
								class={`flex-1 flex-col rounded-md px-4 py-2 text-sm font-medium transition
											${load.value == 100 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
								onclick={() => (load.value = 100)}
							>
								{#if load.load_type === LOAD_TYPES.relay.key}
									<Zap class="mr-2 h-4 w-4" /> On
								{:else}
									<Expand class="mr-2 h-4 w-4" /> Open
								{/if}
							</button>
							<button
								class={`flex-1 flex-col rounded-md px-4 py-2 text-sm font-medium transition
											${load.value == 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
								onclick={() => (load.value = 0)}
							>
								{#if load.load_type === LOAD_TYPES.relay.key}
									<ZapOff class="mr-2 h-4 w-4" /> Off
								{:else}
									<ListCollapse class="mr-2 h-4 w-4" /> Close
								{/if}
							</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>
</div>
