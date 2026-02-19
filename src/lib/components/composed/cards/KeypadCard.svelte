<script lang="ts">
	import type { KeypadResponse } from '$lib/types/keypad';
	import type { RoomResponse } from '$lib/types/room';
	import { Trash2 } from 'lucide-svelte';
	import KeypadKeyCard from './KeypadKeyCard.svelte';
	import { KEYPAD_TYPES } from '$lib/constants/keypad';

	import Modal from '../modals/Modal.svelte';

	import { deleteKeypad } from '$lib/api/keypad';

	const {
		keypad,
		selectedRoom
	}: {
		keypad: KeypadResponse;
		selectedRoom: RoomResponse;
	} = $props();

	// const keypadKeys = $derived.by(() => allKeypadKeys.filter((k) => k.keypad === keypad.id));
	// const mappedKeys = $derived.by(() =>
	// 	keypadKeys.filter((k) => keyActions.some((ka) => ka.key === k.id))
	// );

	const keypadType = $derived.by(() => {
		if (keypad.sub_type === 'corridor') {
			return KEYPAD_TYPES['corridor'];
		}
		return KEYPAD_TYPES[`${keypad.num_keys}key` as keyof typeof KEYPAD_TYPES];
	});

	const keypadLabel = $derived.by(() => {
		if (keypad.sub_type === 'corridor') {
			return 'Corridor Panel';
		}
		return `${keypad.num_keys}-key Keypad`;
	});

	let showDelModal = $state(false);
	async function del(e: Event) {
		await deleteKeypad(keypad.id);
		showDelModal = false;
	}

	const mappedKeys = $derived.by(() => keypad.inputs.filter((k) => k.actions.length > 0));
</script>

<Modal title="Delete Keypad" bind:showModal={showDelModal}>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-muted-foreground">
			Are you sure you want to delete this Keypad? This action cannot be undone.
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
	<!-- Keypad Header -->
	<div class="mb-4 flex items-center justify-between">
		<div>
			<h3 class="font-semibold text-foreground">Address {keypad.address}</h3>
			<h3 class="font-semibold text-foreground">CAT-6 Branch: {keypad.cat6_branch}</h3>

			<p class="text-sm text-muted-foreground">{selectedRoom.name}</p>

			<p class="text-xs text-primary">{keypadLabel}</p>
		</div>
		<button
			class="p-1 text-red-500 transition-colors hover:text-red-700"
			onclick={() => (showDelModal = true)}
			title="Delete keypad"
		>
			<Trash2 class="h-4 w-4" />
		</button>
	</div>

	<KeypadKeyCard {keypad} type={keypadType} />

	<!-- Programming Status -->
	<div class="p-4 text-center">
		<div class="mb-2 text-sm text-muted-foreground">
			{mappedKeys.length}/{keypad.inputs.length} buttons programmed
		</div>
		<div class="h-2 w-full rounded-full bg-muted">
			<div
				class="h-2 rounded-full bg-primary transition-all duration-300"
				style="width: {(mappedKeys.length / keypad.inputs.length) * 100}%"
			></div>
		</div>
	</div>
</div>
