<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import type { UnitRequest } from '$lib/types/unit';
	import { createUnit } from '$lib/api/unit';

	let { projectId, showModal = $bindable(false) }: { projectId: number; showModal?: boolean } =
		$props();

	let unitRequest = $state<UnitRequest>({
		name: '',
		description: '',
		notes: '',
		project: projectId
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		await createUnit(unitRequest);
		showModal = false;
	}
</script>

<form class="space-y-4 p-4" onsubmit={handleSubmit}>
	<div class="flex flex-col space-y-1">
		<label class="font-medium" for="unit-name">Name</label>
		<input
			id="unit-name"
			name="unit-name"
			type="text"
			bind:value={unitRequest.name}
			class="rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>

	<div class="flex flex-col space-y-1">
		<label class="font-medium" for="unit-description">Description</label>
		<textarea
			id="unit-description"
			name="unit-description"
			bind:value={unitRequest.description}
			class="h-28 resize-none rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		></textarea>
	</div>

	<div class="flex flex-col space-y-1">
		<label class="font-medium" for="unit-project">Notes</label>
		<textarea
			id="unit-notes"
			name="unit-notes"
			bind:value={unitRequest.notes}
			class="h-28 resize-none rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		></textarea>
	</div>

	<div class="pt-2">
		<Button type="submit" class="w-full">Create Unit</Button>
	</div>
</form>
