<script lang="ts">
	import type { KEY_CARD_TYPES } from '$lib/constants/key_card';
	import KeycardImage from '$lib/assets/key-card.svg';
	import type { KeyCardResponse } from '$lib/types/key_card';
	import { Trash2 } from 'lucide-svelte';
	import Modal from '../modals/Modal.svelte';
	import { deleteKeyCard } from '$lib/api/key_card';
	import type { RoomResponse } from '$lib/types/room';

	const {
		type,
		keycard,
		selectedRoom
	}: {
		type: (typeof KEY_CARD_TYPES)[keyof typeof KEY_CARD_TYPES];
		keycard: KeyCardResponse;
		selectedRoom: RoomResponse;
	} = $props();

	let showDelModal = $state(false);
	async function del(e: Event) {
		await deleteKeyCard(keycard.id);
		showDelModal = false;
	}
</script>

<Modal title="Delete Keycard" bind:showModal={showDelModal}>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-muted-foreground">
			Are you sure you want to delete this Keycard? This action cannot be undone.
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
	class="w-96 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
>
	<!-- Keycard Header -->
	<div class="mb-4 flex items-center justify-between">
		<div>
			<h3 class="font-semibold text-foreground">Address {keycard.address}</h3>
			<h3 class="font-semibold text-foreground">CAT-6 Branch: {keycard.cat6_branch}</h3>

			<p class="text-sm text-muted-foreground">{selectedRoom.name}</p>

			<p class="text-xs text-primary">KeyCard Reader</p>
		</div>
		<button
			class="p-1 text-red-500 transition-colors hover:text-red-700"
			onclick={() => (showDelModal = true)}
			title="Delete keypad"
		>
			<Trash2 class="h-4 w-4" />
		</button>
	</div>

	<!-- Main keycard container -->
	<div
		class="relative m-auto aspect-square w-80 rounded-2xl bg-muted shadow-lg"
		style={`background-image:url('${KeycardImage}');
				background-size:contain;
				background-repeat:no-repeat;
				background-position:center;`}
	></div>
</div>
