<script lang="ts">
	import LoadsList from '$lib/components/composed/lists/LoadList.svelte';
	import { getDashboardContext } from '$lib/context/dashboard';
	import { getRoomLoads } from '$lib/utils/filter';
	import { MapPin, Plus } from 'lucide-svelte';

	const ctx = getDashboardContext();
</script>

<!-- Loads by Room -->
<div class="space-y-6">
	{#if ctx.rooms.length > 0}
		{#each ctx.rooms as room}
			<LoadsList loads={getRoomLoads(ctx.loads, room.id)} {room} />
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
