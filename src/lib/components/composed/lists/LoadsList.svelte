<script lang="ts">
	import { Trash2, Lightbulb, Pencil, MapPin, Plus } from 'lucide-svelte';
	import Modal from '../dialogs/Modal.svelte';
	import { LOAD_MODAL_TYPES } from '$lib/constants/load';
	import LoadForm from '../forms/LoadForm.svelte';
	import LoadCard from '../cards/LoadCard.svelte';
	const { loads, room } = $props();
	let showModal = $state(false);
	let loadModalTitle = LOAD_MODAL_TYPES.CREATE;
</script>

<Modal bind:showModal title={loadModalTitle}>
	<LoadForm formType={loadModalTitle} {room} bind:showModal />
</Modal>

<div class="rounded-lg border border-gray-200">
	<!-- Room Header -->
	<div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
		<div class="flex items-center space-x-3">
			<MapPin class="h-5 w-5 text-blue-600" />
			<h5 class="font-medium text-gray-900">{room.name}</h5>
		</div>

		<div class="flex items-center space-x-2">
			<span class="text-sm text-gray-500">
				{loads.length} load{loads.length !== 1 ? 's' : ''}
			</span>

			<button
				onclick={() => {
					showModal = true;
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
		{#if loads.length > 0}
			<!-- <LoadsList loads={roomLoads} {room} /> -->
			<!-- Loads Grid -->
			{#if loads.length > 0}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each loads as load}
						<LoadCard {load} {room} />
					{/each}
				</div>
			{:else}
				<div class="py-4 text-center text-gray-500">
					<Lightbulb class="mx-auto mb-2 h-8 w-8 text-gray-300" />
					<p class="text-sm">No loads available</p>
				</div>
			{/if}
		{:else}
			<div class="py-4 text-center text-gray-500">
				<p class="text-sm">No loads in this room</p>
				<button
					onclick={() => {
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
