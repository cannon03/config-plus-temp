<script lang="ts">
	import { Layers, Pencil, Trash2, Plus } from 'lucide-svelte';
	import RoomList from '$lib/components/composed/lists/RoomList.svelte';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { RoomResponse } from '$lib/types/room';
	import Modal from '../modals/Modal.svelte';
	import { deleteZone } from '$lib/api/zone';
	import { ROOM_FORM_TYPES } from '$lib/constants/room';
	import RoomForm from '../forms/RoomForm.svelte';
	import { ZONE_FORM_TYPES } from '$lib/constants/zone';
	import ZoneForm from '../forms/ZoneForm.svelte';
	import type { Unit } from '$lib/types/unit';

	let { unit, zone }: { unit: Unit; zone: ZoneResponse } = $props();
	let showDelModal = $state(false);
	let showModal = $state(false);
	let modalKey = $state(0);
	let showEditModal = $state(false);
	export async function del(e: Event) {
		await deleteZone(zone.id);
		showDelModal = false;
	}
	function openModal() {
		showModal = true;
		modalKey++;
	}
</script>

<Modal title="Delete Load" bind:showModal={showDelModal}>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-gray-600">
			Are you sure you want to delete this zone? This action cannot be undone.
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
				class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
			>
				Cancel
			</button>
		</div>
	</div>
</Modal>

<Modal title={ROOM_FORM_TYPES.CREATE} bind:showModal>
	{#key modalKey}
		<RoomForm {zone} type={ROOM_FORM_TYPES.CREATE} bind:showModal />
	{/key}
</Modal>

<Modal title={ZONE_FORM_TYPES.EDIT} bind:showModal={showEditModal}>
	<ZoneForm {unit} {zone} type={ZONE_FORM_TYPES.EDIT} bind:showModal={showEditModal} />
</Modal>

<div class="rounded-lg border border-gray-200">
	<!-- Zone Header -->
	<div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
		<div class="flex items-center space-x-3">
			<Layers class="h-5 w-5 text-blue-600" />
			<div>
				<h5 class="font-medium text-gray-900">{zone.name}</h5>
				<p class="text-sm text-gray-500">Unit {unit.id}</p>
			</div>
		</div>

		<div class="flex items-center space-x-2">
			<button
				class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
				onclick={() => (showEditModal = true)}
				title="Edit zone"
			>
				<Pencil class="h-4 w-4" />
			</button>
			<button
				class="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
				onclick={() => (showDelModal = true)}
				title="Delete zone"
			>
				<Trash2 class="h-4 w-4" />
			</button>
		</div>
	</div>

	<!-- Zone Content -->
	<div class="p-4">
		<div class="mb-4 flex items-center justify-between">
			<h6 class="text-sm font-medium text-gray-700">Rooms</h6>
			<button
				onclick={() => openModal()}
				class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				<Plus class="mr-1 h-3 w-3" /> Add Room
			</button>
		</div>

		<RoomList {zone} rooms={zone.rooms} />
	</div>
</div>
