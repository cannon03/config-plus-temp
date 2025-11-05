<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import { ZONE_FORM_TYPES } from '$lib/constants/zone';
	import { Save } from 'lucide-svelte';
	import type { RoomRequest, RoomResponse } from '$lib/types/room';
	import type { ZoneResponse } from '$lib/types/zone';
	import { createRoom, updateRoom } from '$lib/api/room';
	import { ROOM_FORM_TYPES } from '$lib/constants/room';
	let {
		zone,
		room,
		type,
		showModal = $bindable(false)
	}: { zone: ZoneResponse; room?: RoomResponse; showModal: boolean; type: string } = $props();
	let roomRequest = $state<RoomRequest>({
		zone: zone.id,
		name: room?.name ?? ''
	});

	console.log('TYPE', type);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (type === ROOM_FORM_TYPES.CREATE) {
			await createRoom(roomRequest);
		} else if (type === ROOM_FORM_TYPES.EDIT) {
			await updateRoom(room!.id, roomRequest);
		}
		showModal = false;
	}
</script>

<form class="flex flex-col space-y-4" onsubmit={handleSubmit}>
	<div class="flex flex-col">
		<label for="unit-name" class="text-sm font-medium text-gray-600">Unit</label>
		<input
			disabled
			type="text"
			name="unit-name"
			value={zone.name}
			id="unit-name"
			class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>
	<div class="flex flex-col">
		<label for="name" class="text-sm font-medium text-gray-600">Name</label>
		<input
			type="text"
			name="name"
			bind:value={roomRequest.name}
			id="name"
			class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>
	<div class="flex justify-end">
		<Button type="submit" variant="saveform"
			>{type === ROOM_FORM_TYPES.CREATE ? 'Create' : 'Update'} Room <Save class="h-4 w-4" /></Button
		>
	</div>
</form>
