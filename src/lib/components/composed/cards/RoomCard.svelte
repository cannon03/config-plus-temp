<script lang="ts">
	import { MapPin, Eye, Trash2, Pencil } from 'lucide-svelte';
	import type { RoomResponse } from '$lib/types/room';
	import { deleteRoom } from '$lib/api/room';
	import Modal from '../modals/Modal.svelte';
	import { ROOM_FORM_TYPES } from '$lib/constants/room';
	import RoomForm from '../forms/RoomForm.svelte';
	import type { ZoneResponse } from '$lib/types/zone';
	import { onMount } from 'svelte';

	let { zone, room }: { zone: ZoneResponse; room: RoomResponse } = $props();

	let showDelModal = $state(false);
	let showModal = $state(false);
	async function del(e: Event) {
		await deleteRoom(room.id);
		showDelModal = false;
	}

	onMount(() => {
		console.log('ZONE__ROOM', zone);
	});
</script>

<Modal title={ROOM_FORM_TYPES.EDIT} bind:showModal>
	<RoomForm {zone} {room} type={ROOM_FORM_TYPES.EDIT} bind:showModal />
</Modal>

<Modal title="Delete Room" bind:showModal={showDelModal}>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-muted-foreground">
			Are you sure you want to delete this room? This action cannot be undone.
		</p>

		<div class="mt-4 flex gap-3">
			<button
				onclick={del}
				class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
			>
				Yes, Delete
			</button>
			<button
				onclick={() => (showDelModal = false)}
				class="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
			>
				Cancel
			</button>
		</div>
	</div>
</Modal>

<!-- <Modal title={ROOM_FORM_TYPES.EDIT} bind:showModal>
	<RoomForm {zone} {room} type={ROOM_FORM_TYPES.EDIT} bind:showModal />
</Modal> -->

<div
	class="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/50"
>
	<div class="flex items-center space-x-3">
		<MapPin class="h-4 w-4 text-muted-foreground" />
		<p class="text-sm font-medium text-foreground">{room.name}</p>
	</div>

	<div class="flex items-center space-x-1">
		<button class="rounded p-1 text-muted-foreground hover:text-foreground" title="View details">
			<Eye class="h-3 w-3" />
		</button>
		<button
			onclick={() => (showModal = true)}
			class="rounded p-1 text-muted-foreground hover:text-foreground"
			title="Edit room"
		>
			<Pencil class="h-3 w-3" />
		</button>
		<button
			onclick={() => {
				showDelModal = true;
			}}
			class="rounded p-1 text-muted-foreground hover:text-red-600"
			title="Delete room"
		>
			<Trash2 class="h-3 w-3" />
		</button>
	</div>
</div>
