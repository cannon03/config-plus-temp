<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import { Save } from 'lucide-svelte';
	import type { KeyInput, KeyInputNameRequest } from '$lib/types/key_input';
	import { updateKeyInputName } from '$lib/api/key_input';

	let {
		keyInput,
		showModal = $bindable(false)
	}: {
		keyInput: KeyInput;
		showModal: boolean;
	} = $props();

	let nameRequest = $state<KeyInputNameRequest>({
		id: keyInput.id,
		name: keyInput.name ?? ''
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		await updateKeyInputName(keyInput.id, nameRequest);
		showModal = false;
	}
</script>

<form class="flex flex-col space-y-4" onsubmit={handleSubmit}>
	<div class="flex flex-col">
		<label for="key-index" class="text-sm font-medium text-gray-600">Key Index</label>
		<input
			disabled
			type="text"
			name="key-index"
			value={keyInput.key_index}
			id="key-index"
			class="mt-1 rounded-lg border bg-gray-100 px-4 py-2 shadow-sm"
		/>
	</div>
	<div class="flex flex-col">
		<label for="key-name" class="text-sm font-medium text-gray-600">Name</label>
		<input
			type="text"
			name="key-name"
			bind:value={nameRequest.name}
			id="key-name"
			placeholder="Enter key name"
			class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>
	<div class="flex justify-end">
		<Button type="submit" variant="saveform">
			Save Name <Save class="h-4 w-4" />
		</Button>
	</div>
</form>
