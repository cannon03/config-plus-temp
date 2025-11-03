<script lang="ts">
	import { Trash2, Lightbulb, Pencil } from 'lucide-svelte';
	const { loads } = $props();

	const editLoad = (load) => console.log('Edit:', load);
	const deleteLoad = (load) => console.log('Delete:', load);
</script>

<!-- Loads Grid -->
{#if loads.length > 0}
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each loads as load}
			<div
				class="rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300 hover:shadow-sm"
			>
				<div class="flex items-start justify-between">
					<div class="flex items-center space-x-3">
						<Lightbulb class="h-5 w-5 text-blue-600" />
						<div>
							<h6 class="text-sm font-medium text-gray-900">{load.name}</h6>
							<p class="text-xs text-gray-500 capitalize">{load.load_type}</p>
						</div>
					</div>

					<div class="flex items-center space-x-1">
						<button
							onclick={() => editLoad(load)}
							class="rounded p-1 text-gray-400 hover:text-gray-600"
							title="Edit load"
						>
							<Pencil class="h-3 w-3" />
						</button>
						<button
							onclick={() => deleteLoad(load)}
							class="rounded p-1 text-gray-400 hover:text-red-600"
							title="Delete load"
						>
							<Trash2 class="h-3 w-3" />
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class="py-4 text-center text-gray-500">
		<Lightbulb class="mx-auto mb-2 h-8 w-8 text-gray-300" />
		<p class="text-sm">No loads available</p>
	</div>
{/if}
