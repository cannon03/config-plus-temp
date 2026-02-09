<script lang="ts">
	import LoadsList from '$lib/components/composed/lists/LoadList.svelte';
	import { getDashboardContext } from '$lib/context/dashboard';
	import { MapPin } from 'lucide-svelte';

	const ctx = getDashboardContext();
	const rooms = $derived.by(() => ctx.domainGraph.layout.zones.flatMap((z) => z.rooms));
</script>

<!-- Loads by Room -->
<div class="space-y-6">
	{#if rooms.length > 0}
		{#each rooms as room}
			<LoadsList loads={room.loads} {room} />
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
