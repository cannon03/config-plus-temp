<script lang="ts">
	import { fetchProducts, fuzzySearchProducts } from '$lib/api/product';
	import { getDashboardContext } from '$lib/context/dashboard';
	import { Search } from 'lucide-svelte';
	import type { ProductResponse } from '$lib/types/product';
	import { onMount } from 'svelte';
	import Modal from '$lib/components/composed/modals/Modal.svelte';
	import AddRoomProductForm from '$lib/components/composed/forms/AddRoomProductForm.svelte';

	let search = $state('');
	const ctx = getDashboardContext();
	let selectedProduct = $state<ProductResponse>();
	let products: Array<ProductResponse> = $state([]);
	let showModal = $state(false);
	let showModalKey = $state(0);

	async function searchProducts(event: Event) {
		if (event) event.preventDefault();
		const searchResponse = await fuzzySearchProducts(search);
		products = searchResponse.results;
	}

	async function showAddRoomProductModal(product: ProductResponse) {
		selectedProduct = product;
		showModalKey++;
		showModal = true;
	}
	onMount(async () => {
		// products = await fetchProducts();
	});

	const rooms = $derived.by(() => ctx.domainGraph.layout.zones.flatMap((zone) => zone.rooms));
</script>

{#key showModalKey}
	<Modal bind:showModal title="Add Product to Room">
		<AddRoomProductForm {rooms} product={selectedProduct} bind:showModal />
	</Modal>
{/key}

<div class="w-full space-y-10 bg-[#f7f9fc] p-6">
	<!-- Search -->
	<div class="space-y-3">
		<label
			for="products-search"
			class="text-xs font-semibold tracking-wide text-gray-600 uppercase"
		>
			Search products
		</label>

		<form
			class="relative flex items-center rounded-xl border border-gray-300 bg-white focus-within:border-[#4C8BF5] focus-within:ring-1 focus-within:ring-[#4C8BF5]"
			onsubmit={searchProducts}
		>
			<Search class="ml-3 h-4 w-4 text-gray-400" />

			<input
				id="products-search"
				type="search"
				bind:value={search}
				placeholder="Search by name, category, or type"
				class="w-full bg-transparent px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
			/>

			<button
				type="submit"
				class="hover:bg-blue-80 mr-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-[#4C8BF5] opacity-90 hover:cursor-pointer"
			>
				Search
			</button>
		</form>
	</div>

	<!-- Global Catalogue -->
	<div class="space-y-3">
		<p class="text-sm font-semibold tracking-wide text-gray-700">Global Catalogue</p>

		<div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
			<!-- Header -->
			<div
				class="grid grid-cols-7 border-b border-gray-200 bg-gray-50 px-4 py-2 text-[11px] font-semibold tracking-wider text-gray-600 uppercase"
			>
				<div>Category</div>
				<div class="col-span-2">Product</div>
				<div>Type</div>
				<div>Model</div>
				<div class="text-right">Price</div>
				<div></div>
			</div>

			{#each products as p}
				<div
					class="grid grid-cols-7 items-center border-b border-gray-100 px-4 py-3 text-sm transition hover:bg-[#4C8BF5]/3"
				>
					<div class="text-gray-500">{p.category_name}</div>

					<div class="col-span-2 font-medium text-gray-900">
						{p.name}
					</div>

					<div class="text-gray-600">{p.type_name}</div>

					<div class="text-gray-500">{p.model_number}</div>

					<div class="text-right font-medium text-gray-800">{p.price}</div>

					<div class="text-right">
						<button
							class="rounded-full border border-[#4C8BF5]/30 bg-[#4C8BF5]/10 px-3 py-1 text-xs font-semibold text-[#4C8BF5] hover:cursor-pointer hover:bg-[#4C8BF5]/20"
							onclick={() => showAddRoomProductModal(p)}
						>
							Add
						</button>
					</div>
				</div>
			{/each}

			{#if products.length === 0}
				<div class="px-6 py-12 text-center text-sm text-gray-400">
					Start typing to search the catalogue
				</div>
			{/if}
		</div>
	</div>

	<!-- Existing Products -->
	<div class="space-y-3">
		<p class="text-sm font-semibold tracking-wide text-gray-700">Existing Products</p>

		<div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
			<table class="w-full text-left text-sm">
				<thead
					class="border-b border-gray-200 bg-gray-50 text-[11px] tracking-wider text-gray-600 uppercase"
				>
					<tr>
						<th class="px-4 py-3 font-semibold">Product</th>
						<th class="px-4 py-3 font-semibold">Category</th>
						<th class="px-4 py-3 font-semibold">Type</th>
						<th class="px-4 py-3 font-semibold">Model</th>
						<th class="px-4 py-3 font-semibold">Unit Price</th>
						<th class="px-4 py-3 font-semibold">Qty</th>
						<th class="px-4 py-3 font-semibold">Total</th>
						<th class="px-4 py-3 font-semibold">Notes</th>
					</tr>
				</thead>

				<tbody class="divide-y divide-gray-100 text-gray-700">
					{#each ctx.roomProducts as product}
						<tr class="transition hover:bg-[#4C8BF5]/3">
							<td class="px-4 py-3 font-medium text-gray-900">
								{product.product_name}
							</td>
							<td class="px-4 py-3">{product.category_name}</td>
							<td class="px-4 py-3">{product.type_name}</td>
							<td class="px-4 py-3 text-gray-500">{product.product_model}</td>
							<td class="px-4 py-3">{product.product_price}</td>
							<td class="px-4 py-3">{product.quantity}</td>
							<td class="px-4 py-3 font-semibold text-[#4C8BF5]">
								{product.total_price}
							</td>
							<td class="max-w-[220px] truncate px-4 py-3 text-gray-500 italic">
								{product.notes}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
