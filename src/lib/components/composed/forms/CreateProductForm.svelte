<script lang="ts">
	import { Save } from 'lucide-svelte';
	import { createProduct, fetchProductTypes } from '$lib/api/product';
	import type { ProductRequest, ProductResponse } from '$lib/types/product';
	import { onMount } from 'svelte';

	let {
		showModal = $bindable(false),
		onSuccess
	}: {
		showModal?: boolean;
		onSuccess?: (product: ProductResponse) => void;
	} = $props();

	let productTypes: Array<{ id: number; name: string }> = $state([]);

	let productType = $state<number | null>(null);
	let name = $state('');
	let model = $state('');
	let description = $state('');
	let modules = $state(1);
	let depth = $state('');
	let material = $state('');
	let price = $state(0);
	let active = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!productType) return;

		const product: ProductRequest = {
			product_type: productType,
			name: name,
			model_number: model,
			description: description,
			specifications: {
				modules: modules,
				depth: depth,
				material: material
			},
			price: price.toString(),
			is_active: active
		};

		try {
			const newProduct = await createProduct(product);
			onSuccess?.(newProduct);
			showModal = false;
			// Reset form
			productType = null;
			name = '';
			model = '';
			description = '';
			modules = 1;
			depth = '';
			material = '';
			price = 0;
			active = false;
		} catch (error) {
			console.error(error);
		}
	}

	onMount(async () => {
		try {
			productTypes = await fetchProductTypes();
			if (productTypes.length > 0) {
				productType = productTypes[0].id;
			}
		} catch (e) {
			console.error('Failed to load product types', e);
		}
	});
</script>

<form class="flex h-full flex-col overflow-y-auto" onsubmit={handleSubmit}>
	<!-- Content -->
	<div class="grid grid-cols-1 gap-x-6 gap-y-4 overflow-y-auto p-6 md:grid-cols-2">
		<div class="flex flex-col">
			<label for="productType" class="mb-1 text-sm font-medium text-gray-700">Product Type</label>
			<select
				bind:value={productType}
				id="productType"
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
			>
				{#each productTypes as pt}
					<option value={pt.id}>{pt.name}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col">
			<label for="name" class="mb-1 text-sm font-medium text-gray-700">Name</label>
			<input
				bind:value={name}
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				type="text"
				id="name"
				required
			/>
		</div>
		<div class="flex flex-col">
			<label for="model" class="mb-1 text-sm font-medium text-gray-700">Model</label>
			<input
				bind:value={model}
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				type="text"
				id="model"
				required
			/>
		</div>
		<div class="flex flex-col md:col-span-2">
			<label for="description" class="mb-1 text-sm font-medium text-gray-700">Description</label>
			<textarea
				bind:value={description}
				class="resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				id="description"
				rows="2"
			></textarea>
		</div>
		<div class="flex flex-col">
			<label for="modules" class="mb-1 text-sm font-medium text-gray-700">Modules</label>
			<input
				bind:value={modules}
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				type="number"
				id="modules"
				min="1"
			/>
		</div>
		<div class="flex flex-col">
			<label for="depth" class="mb-1 text-sm font-medium text-gray-700">Depth</label>
			<input
				bind:value={depth}
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				type="text"
				id="depth"
			/>
		</div>
		<div class="flex flex-col">
			<label for="material" class="mb-1 text-sm font-medium text-gray-700">Material</label>
			<input
				bind:value={material}
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				type="text"
				id="material"
			/>
		</div>
		<div class="flex flex-col">
			<label for="price" class="mb-1 text-sm font-medium text-gray-700">Price</label>
			<input
				bind:value={price}
				class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
				type="number"
				id="price"
				min="0"
			/>
		</div>
		<div class="mt-2 flex items-center md:mt-0">
			<input bind:checked={active} class="mr-2 accent-blue-600" type="checkbox" id="active" />
			<label for="active" class="text-sm font-medium text-gray-700">Active</label>
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
