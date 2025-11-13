<script lang="ts">
	import { Plus, Building2 } from 'lucide-svelte';
	import { getDashboardContext } from '$lib/context/dashboard';
	import ZoneCard from '$lib/components/composed/cards/ZoneCard.svelte';
	import type { ZoneResponse } from '$lib/types/zone';
	import type { RoomResponse } from '$lib/types/room';
	import Modal from '../modals/Modal.svelte';
	import ZoneForm from '../forms/ZoneForm.svelte';
	import { ZONE_FORM_TYPES } from '$lib/constants/zone';
	import { getZoneRooms } from '$lib/utils/filter';

	const ctx = getDashboardContext();

	let showModal = $state(false);
	let modalKey = $state(0);
	function openModal() {
		modalKey++;
		showModal = true;
	}
</script>

<Modal title={ZONE_FORM_TYPES.CREATE} bind:showModal>
	{#key modalKey}
		<ZoneForm type={ZONE_FORM_TYPES.CREATE} unit={ctx.unit} bind:showModal />
	{/key}
</Modal>

<div class="rounded-lg bg-white p-6">
	<!-- Header -->
	<div class="mb-6 flex items-end justify-end">
		<button
			onclick={() => openModal()}
			class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
		>
			<Plus class="mr-2 h-4 w-4" /> Add Zone
		</button>
	</div>

	<!-- Zones -->
	<div class="space-y-4">
		{#if ctx.zones.length > 0}
			{#each ctx.zones as zone}
				<ZoneCard unit={ctx.unit} {zone} rooms={getZoneRooms(zone.id, ctx.rooms)} />
			{/each}
		{:else}
			<div class="py-8 text-center">
				<Building2 class="mx-auto mb-4 h-12 w-12 text-gray-300" />
				<h5 class="mb-2 text-sm font-medium text-gray-900">No zones created</h5>
				<p class="mb-4 text-sm text-gray-500">
					Create your first zone to start building the structure
				</p>
				<button
					class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
				>
					<Plus class="mr-2 h-4 w-4" /> Create Zone
				</button>
			</div>
		{/if}
	</div>
</div>
