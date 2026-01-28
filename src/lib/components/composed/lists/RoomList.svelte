<script lang="ts">
	import { MapPin } from 'lucide-svelte';
	import RoomCard from '$lib/components/composed/cards/RoomCard.svelte';
	import type { RoomResponse } from '$lib/types/room';
	import type { ZoneResponse } from '$lib/types/zone';

	let { zone, rooms }: { zone: ZoneResponse; rooms: Array<RoomResponse> } = $props();
</script>

{#if rooms.length > 0}
	<div class="space-y-2">
		{#each rooms as room}
			<RoomCard {zone} {room} />
		{/each}
	</div>
{:else}
	<div class="py-4 text-center text-gray-500">
		<MapPin class="mx-auto mb-2 h-8 w-8 text-gray-300" />
		<p class="text-sm">No rooms in this zone</p>
		<button class="mt-2 text-xs text-blue-600 hover:text-blue-800">Add first room</button>
	</div>
{/if}
