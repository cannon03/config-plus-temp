<script lang="ts">
	import { Lightbulb, Pencil, Trash2 } from 'lucide-svelte';
	import type { LoadResponse } from '$lib/types/load';
	import type { RoomResponse } from '$lib/types/room';
	import { LOAD_MODAL_TYPES } from '$lib/constants/load';
	import Modal from '../modals/Modal.svelte';
	import LoadForm from '../forms/LoadForm.svelte';
	import { deleteLoad } from '$lib/api/load';
	import { RELOAD_TARGETS } from '$lib/constants/dashboard';

	const { load, room }: { load: LoadResponse; room: RoomResponse } = $props();
	let showModal = $state(false);
	let showDelModal = $state(false);
	let loadModalTitle = LOAD_MODAL_TYPES.EDIT;

	async function del(e: Event) {
		e.preventDefault();
		await deleteLoad(load.id);
		showDelModal = false;
	}
</script>

<Modal bind:showModal title={loadModalTitle}>
	<LoadForm formType={loadModalTitle} {load} {room} bind:showModal />
</Modal>

<Modal title="Delete Load" bind:showModal={showDelModal}>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-muted-foreground">
			Are you sure you want to delete this load? This action cannot be undone.
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

<div
	class="rounded-lg border border-border p-4 transition-colors hover:border-primary/40 hover:shadow-sm"
>
	<div class="flex items-start justify-between">
		<div class="flex items-center space-x-3">
			<Lightbulb class="h-5 w-5 text-primary" />
			<div>
				<h6 class="text-sm font-medium text-foreground">{load.name}</h6>
				<p class="text-xs text-muted-foreground capitalize">{load.load_type}</p>
			</div>
		</div>

		<div class="flex items-center space-x-1">
			<button
				onclick={() => {
					showModal = true;
				}}
				class="rounded p-1 text-muted-foreground hover:text-foreground"
				title="Edit load"
			>
				<Pencil class="h-3 w-3" />
			</button>
			<button
				onclick={() => {
					showDelModal = true;
				}}
				class="rounded p-1 text-muted-foreground hover:text-red-600"
				title="Delete load"
			>
				<Trash2 class="h-3 w-3" />
			</button>
		</div>
	</div>
</div>
