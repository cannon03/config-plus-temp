<script lang="ts">
	import LoadsList from '$lib/components/composed/lists/LoadsList.svelte';
	import { getDashboardContext } from '$lib/context/dashboard';
	import { getRoomLoads } from '$lib/utils/filter';
	import { MapPin, Plus } from 'lucide-svelte';

	const ctx = getDashboardContext();
	const { rooms, loads } = ctx;
</script>

<!-- Loads by Room -->
<div class="space-y-6">
	{#if rooms.length > 0}
		{#each rooms as room}
			{@const roomLoads = getRoomLoads(loads, room.id)}

			<div class="rounded-lg border border-gray-200">
				<!-- Room Header -->
				<div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
					<div class="flex items-center space-x-3">
						<MapPin class="h-5 w-5 text-blue-600" />
						<h5 class="font-medium text-gray-900">{room.name}</h5>
					</div>

					<div class="flex items-center space-x-2">
						<span class="text-sm text-gray-500">
							{roomLoads.length} load{roomLoads.length !== 1 ? 's' : ''}
						</span>

						<button
							on:click={() => {
								console.log('Add load to room:', room.name);
							}}
							class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						>
							<Plus class="mr-1 h-3 w-3" />
							Add Load
						</button>
					</div>
				</div>

				<!-- Room Loads -->
				<div class="p-4">
					{#if roomLoads.length > 0}
						<LoadsList loads={roomLoads} />
					{:else}
						<div class="py-4 text-center text-gray-500">
							<p class="text-sm">No loads in this room</p>
							<button
								on:click={() => {
									console.log('Add first load to', room.name);
								}}
								class="mt-2 text-xs text-blue-600 hover:text-blue-800"
							>
								Add first load
							</button>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	{:else}
		<!-- Empty State -->
		<div class="py-8 text-center">
			<MapPin class="mx-auto mb-4 h-12 w-12 text-gray-300" />
			<h5 class="mb-2 text-sm font-medium text-gray-900">No rooms available</h5>
			<p class="mb-4 text-sm text-gray-500">Create rooms first to add loads</p>
		</div>
	{/if}
</div>
