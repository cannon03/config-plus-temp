<script lang="ts">
	import type { KeypadKeyRequest, KeypadKeyResponse } from '$lib/types/keypadkey';
	import { Pencil, Save, X } from 'lucide-svelte';
	import Modal from './Modal.svelte';
	import { updateKeypadKey } from '$lib/api/keypadkey';

	let {
		keypadKey,
		showModal = $bindable()
	}: {
		keypadKey: KeypadKeyResponse;
		showModal: boolean;
	} = $props();

	let keypadKeyRequest = $state<KeypadKeyRequest>({
		name: keypadKey.name ?? ''
	});

	let isEditing = $state(false);

	async function changeName() {
		await updateKeypadKey(keypadKey.id, keypadKeyRequest);
		showModal = false;
	}
</script>

<Modal bind:showModal title="Keypad Key Information">
	<div class="flex flex-col items-center gap-6 p-6 text-center">
		<div
			class="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-sm transition-all"
		>
			{#if isEditing}
				<div class="flex flex-col items-center gap-3">
					<input
						type="text"
						bind:value={keypadKeyRequest.name}
						class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none"
						placeholder="Enter key name"
					/>
					<div class="flex items-center gap-2">
						<button
							onclick={changeName}
							class="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
						>
							<Save class="h-4 w-4" />
							<span>Save</span>
						</button>
						<button
							onclick={() => (isEditing = false)}
							class="flex items-center gap-1 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-border active:scale-[0.98]"
						>
							<X class="h-4 w-4" />
							<span>Cancel</span>
						</button>
					</div>
				</div>
			{:else}
				<div class="flex flex-col items-center gap-3">
					<p class="text-base font-semibold text-foreground">
						<span class="font-normal text-muted-foreground">Name:</span>
						{keypadKey.name ?? 'Not Assigned'}
					</p>
					<button
						onclick={() => (isEditing = true)}
						class="flex items-center gap-1 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-border active:scale-[0.98]"
					>
						<Pencil class="h-4 w-4" />
						<span>Edit Name</span>
					</button>
				</div>
			{/if}
		</div>
	</div>
</Modal>
