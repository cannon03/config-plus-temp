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
			class="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all"
		>
			{#if isEditing}
				<div class="flex flex-col items-center gap-3">
					<input
						type="text"
						bind:value={keypadKeyRequest.name}
						class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="Enter key name"
					/>
					<div class="flex items-center gap-2">
						<button
							onclick={changeName}
							class="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
						>
							<Save class="h-4 w-4" />
							<span>Save</span>
						</button>
						<button
							onclick={() => (isEditing = false)}
							class="flex items-center gap-1 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-300 active:scale-[0.98]"
						>
							<X class="h-4 w-4" />
							<span>Cancel</span>
						</button>
					</div>
				</div>
			{:else}
				<div class="flex flex-col items-center gap-3">
					<p class="text-base font-semibold text-gray-800">
						<span class="font-normal text-gray-500">Name:</span>
						{keypadKey.name ?? 'Not Assigned'}
					</p>
					<button
						onclick={() => (isEditing = true)}
						class="flex items-center gap-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-200 active:scale-[0.98]"
					>
						<Pencil class="h-4 w-4" />
						<span>Edit Name</span>
					</button>
				</div>
			{/if}
		</div>
	</div>
</Modal>
