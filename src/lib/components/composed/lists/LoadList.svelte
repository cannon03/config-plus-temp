<script lang="ts">
	import { Trash2, Lightbulb, Pencil, MapPin, Plus } from 'lucide-svelte';
	import Modal from '../modals/Modal.svelte';
	import { LOAD_MODAL_TYPES } from '$lib/constants/load';
	import LoadForm from '../forms/LoadForm.svelte';
	import LoadCard from '../cards/LoadCard.svelte';
	const { loads, room } = $props();
	let showModal = $state(false);
	let loadModalTitle = LOAD_MODAL_TYPES.CREATE;
	let modalKey = $state(0);
	function openModal() {
		modalKey++;
		showModal = true;
	}
</script>

<Modal bind:showModal title={loadModalTitle}>
	{#key modalKey}
		<LoadForm formType={loadModalTitle} {room} bind:showModal />
	{/key}
</Modal>

<div class="rounded-lg border border-border">
	<!-- Room Header -->
	<div class="flex items-center justify-between border-b border-border bg-muted/50 p-4">
		<div class="flex items-center space-x-3">
			<MapPin class="h-5 w-5 text-primary" />
			<h5 class="font-medium text-foreground">{room.name}</h5>
		</div>

		<div class="flex items-center space-x-2">
			<span class="text-sm text-muted-foreground">
				{loads.length} load{loads.length !== 1 ? 's' : ''}
			</span>

			<button
				onclick={() => openModal()}
				class="inline-flex items-center rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
			>
				<Plus class="mr-1 h-3 w-3" />
				Add Load
			</button>
		</div>
	</div>

	<!-- Room Loads -->
	<div class="p-4">
		{#if loads.length > 0}
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each loads as load}
					<LoadCard {load} {room} />
				{/each}
			</div>
		{:else}
			<div class="py-4 text-center text-muted-foreground">
				<p class="text-sm">No loads in this room</p>
				<button
					onclick={() => {
						console.log('Add first load to', room.name);
					}}
					class="mt-2 text-xs text-primary hover:opacity-80"
				>
					Add first load
				</button>
			</div>
		{/if}
	</div>
</div>
