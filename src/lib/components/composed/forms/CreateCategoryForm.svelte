<script lang="ts">
	import { Save } from 'lucide-svelte';
	import { createCategory } from '$lib/api/product';
	import type { CategoryResponse } from '$lib/types/product';

	let {
		showModal = $bindable(false),
		onSuccess
	}: {
		showModal?: boolean;
		onSuccess?: (category: CategoryResponse) => void;
	} = $props();

	let name = $state('');
	let description = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!name.trim()) return;

		const category = {
			name: name,
			description: description
		};

		try {
			const newCategory = await createCategory(category);
			onSuccess?.(newCategory);
			showModal = false;
			// Reset form
			name = '';
			description = '';
		} catch (error) {
			console.error(error);
		}
	}
</script>

<form class="flex h-full flex-col" onsubmit={handleSubmit}>
	<!-- Content -->
	<div class="grid grid-cols-1 gap-x-6 gap-y-4 overflow-y-auto p-6">
		<div class="flex flex-col">
			<label for="categoryName" class="mb-1 text-sm font-medium text-gray-700">Name</label>
			<input
				bind:value={name}
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				type="text"
				id="categoryName"
				required
			/>
		</div>
		<div class="flex flex-col">
			<label for="categoryDescription" class="mb-1 text-sm font-medium text-gray-700"
				>Description</label
			>
			<textarea
				bind:value={description}
				class="resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				id="categoryDescription"
				rows="3"
				placeholder="Description"
			></textarea>
		</div>
	</div>

	<!-- Footer -->
	<div
		class="sticky bottom-0 flex items-center justify-center gap-2 border-t bg-white px-6 pt-2 pb-6"
	>
		<button
			type="submit"
			class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
		>
			<Save class="h-4 w-4" />
			Create
		</button>
	</div>
</form>
