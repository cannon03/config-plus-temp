<script lang="ts">
	import { Link, Trash2 } from 'lucide-svelte';
	import { findLoadName } from '$lib/utils/filter';
	import Modal from '../modals/Modal.svelte';
	import { deleteChannel } from '$lib/api/channel';

	const { channels, loads } = $props();
	let selectedChannel = channels.length > 0 ? channels[0].id : 0;

	let showDelModal = $state(false);
	async function del(e: Event) {
		await deleteChannel(selectedChannel);
		showDelModal = false;
	}
</script>

<Modal title="Delete Channel Mapping" bind:showModal={showDelModal}>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-muted-foreground">Are you sure you want to delete this channel?</p>
		<div class="mt-4 flex gap-3">
			<button
				class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
				onclick={del}>Yes, Delete</button
			>
			<button
				class="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
				onclick={() => (showDelModal = false)}>Cancel</button
			>
		</div>
	</div>
</Modal>

{#if channels.length > 0}
	<div class="flex flex-wrap gap-4 p-4">
		{#each channels as channel}
			<div
				class="flex w-40 items-center justify-between space-x-2 rounded-lg bg-muted/50 p-2 text-xs"
			>
				<span class="font-medium text-foreground">CH{channel.channel_number}</span>
				<Link class="h-3 w-3 text-muted-foreground" />
				<span class="truncate text-muted-foreground">{findLoadName(channel.load_id, loads)}</span>
				<button
					class="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600"
					onclick={() => {
						showDelModal = true;
						selectedChannel = channel.id;
					}}
					title="Delete Channel"
				>
					<Trash2 class="h-4 w-4" />
				</button>
			</div>
		{/each}
	</div>
{:else}
	<p class="p-4 text-xs text-muted-foreground">No Channels Found</p>
{/if}
