<script lang="ts">
	import { Save } from 'lucide-svelte';
	import { createProductType, fetchCategories } from '$lib/api/product';
	import type { CategoryResponse, ProductTypeResponse } from '$lib/types/product';
	import { onMount } from 'svelte';

	let {
		showModal = $bindable(false),
		onSuccess
	}: {
		showModal?: boolean;
		onSuccess?: (productType: ProductTypeResponse) => void;
	} = $props();

	let categories: Array<CategoryResponse> = $state([]);

	let category = $state<number | null>(null);
	let name = $state('');
	let description = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!category) return;

		const productType = {
			category: category,
			name: name,
			description: description
		};

		try {
			const newProductType = await createProductType(productType);
			onSuccess?.(newProductType);
			showModal = false;
			// Reset form
			category = categories.length > 0 ? categories[0].id : null;
			name = '';
			description = '';
		} catch (error) {
			console.error(error);
		}
	}

	onMount(async () => {
		try {
			categories = await fetchCategories();
			if (categories.length > 0) {
				category = categories[0].id;
			}
		} catch (e) {
			console.error('Failed to load categories', e);
		}
	});
</script>

<form class="flex h-full flex-col" onsubmit={handleSubmit}>
	<!-- Content -->
	<div class="grid grid-cols-1 gap-x-6 gap-y-4 overflow-y-auto p-6">
		<div class="flex flex-col">
			<label for="productTypeName" class="mb-1 text-sm font-medium text-gray-700">Name</label>
			<input
				bind:value={name}
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				type="text"
				id="productTypeName"
				required
			/>
		</div>
		<div class="flex flex-col">
			<label for="productTypeCategory" class="mb-1 text-sm font-medium text-gray-700"
				>Category</label
			>
			<select
				bind:value={category}
				id="productTypeCategory"
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
			>
				{#each categories as cat}
					<option value={cat.id}>{cat.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col">
			<label for="productTypeDescription" class="mb-1 text-sm font-medium text-gray-700"
				>Description</label
			>
			<textarea
				bind:value={description}
				class="resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				id="productTypeDescription"
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
