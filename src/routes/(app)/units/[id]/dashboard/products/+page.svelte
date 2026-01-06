<script lang="ts">
	import { fetchProducts } from '$lib/api/product';
	import { getDashboardContext } from '$lib/context/dashboard';
	import { Search } from 'lucide-svelte';
	import type { ProductResponse } from '$lib/types/product';
	import { onMount } from 'svelte';

	let search = '';
	const ctx = getDashboardContext();
	let products: Array<ProductResponse> = [];
	onMount(async () => {
		// products = await fetchProducts();
	});
</script>

<div class="w-full space-y-8 p-4">
	<!-- Search -->
	<div class="flex flex-col gap-1">
		<label for="products-search" class="text-sm font-medium tracking-wide text-gray-700"
			>Search products</label
		>
		<div class="relative">
			<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
			<input
				id="products-search"
				type="search"
				bind:value={search}
				placeholder="Search by name, category, or type"
				class="w-full rounded-xl border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm text-gray-800 placeholder-gray-500 transition focus:ring-2 focus:ring-[#4C8BF5] focus:outline-none"
			/>
		</div>
		<!-- Global Catalogue -->
		<div class="mt-4 space-y-3">
			<p class="text-sm font-semibold tracking-wide text-gray-700">Global Catalogue</p>

			<div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
				<!-- Header -->
				<div
					class="grid grid-cols-7 bg-gray-50 px-4 py-2 text-xs font-medium tracking-wide text-gray-600 uppercase"
				>
					<div>Category</div>
					<div class="col-span-2">Product</div>
					<div>Type</div>
					<div>Model</div>
					<div class="text-right">Price</div>
					<div></div>
				</div>

				{#each products.filter((p) => (p.name + p.category_name + p.type_name + p.model_number)
						.toLowerCase()
						.includes(search.toLowerCase())) as p}
					<div class="border-t">
						<!-- Row -->
						<div
							class="grid cursor-pointer grid-cols-7 items-center px-4 py-3 text-sm hover:bg-gray-50"
						>
							<div class="text-gray-500">{p.category_name}</div>

							<div class="col-span-2 font-medium text-gray-900">
								{p.name}
							</div>

							<div class="text-gray-600">{p.type_name}</div>

							<div class="text-gray-500">{p.model_number}</div>

							<div class="text-right font-medium">{p.price}</div>

							<div class="text-right">
								<span
									class="inline-flex items-center rounded-full bg-[#4C8BF5]/10 px-3 py-1 text-xs font-medium text-[#4C8BF5]"
								>
									Add
								</span>
							</div>
						</div>
					</div>
				{/each}

				{#if products.length === 0}
					<div class="px-6 py-10 text-center text-sm text-gray-500">
						Please use the search function to view products.
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Existing products -->
	<div class="space-y-4">
		<p class="text-xl font-semibold tracking-wide text-gray-900">Existing Products</p>

		<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
			<table class="w-full text-left text-sm text-gray-700">
				<thead
					class="border-b border-gray-200 bg-gray-50 text-xs tracking-wide text-gray-700 uppercase"
				>
					<tr>
						<th class="px-4 py-3">Product</th>
						<th class="px-4 py-3">Category</th>
						<th class="px-4 py-3">Type</th>
						<th class="px-4 py-3">Model</th>
						<th class="px-4 py-3">Unit Price</th>
						<th class="px-4 py-3">Qty</th>
						<th class="px-4 py-3">Total</th>
						<th class="px-4 py-3">Notes</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#each ctx.roomProducts as product}
						<tr class="transition hover:bg-gray-50">
							<td class="px-4 py-3 font-medium text-gray-900">{product.product_name}</td>
							<td class="px-4 py-3">{product.category_name}</td>
							<td class="px-4 py-3">{product.type_name}</td>
							<td class="px-4 py-3">{product.product_model}</td>
							<td class="px-4 py-3">{product.product_price}</td>
							<td class="px-4 py-3">{product.quantity}</td>
							<td class="px-4 py-3 font-semibold text-[#4C8BF5]">{product.total_price}</td>
							<td class="max-w-[200px] truncate px-4 py-3 text-gray-500 italic">{product.notes}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
