<script lang="ts">
	import {
		fetchCategories,
		fetchProducts,
		fetchProductTypes,
		fuzzySearchProducts
	} from '$lib/api/product';
	import { getDashboardContext } from '$lib/context/dashboard';
	import { Search } from 'lucide-svelte';
	import type { ProductResponse } from '$lib/types/product';
	import type { ProductTypeResponse } from '$lib/types/product';
	import { onMount } from 'svelte';
	import Modal from '$lib/components/composed/modals/Modal.svelte';
	import AddRoomProductForm from '$lib/components/composed/forms/AddRoomProductForm.svelte';
	import CreateProductForm from '$lib/components/composed/forms/CreateProductForm.svelte';
	import CreateProductTypeForm from '$lib/components/composed/forms/CreateProductTypeForm.svelte';
	import CreateCategoryForm from '$lib/components/composed/forms/CreateCategoryForm.svelte';
	import type { CategoryResponse } from '$lib/types/product';

	let search = $state('');
	const ctx = getDashboardContext();
	let selectedProduct = $state<ProductResponse>();
	let products: Array<ProductResponse> = $state([]);
	let showModal = $state(false);
	let showModalKey = $state(0);

	let showCreateProductModal = $state(false);
	let showCreateProductTypeModal = $state(false);
	let showCreateCategoryModal = $state(false);

	let showProductTypeModalKey = $state(0);
	let showProductCategoryModalKey = $state(0);

	let productTypes = $state<ProductTypeResponse[]>([]);
	let productCategories = $state<CategoryResponse[]>([]);

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

	function handleProductCreated(product: ProductResponse) {
		// Optionally add the new product to the list or refresh
		products = [product, ...products];
	}

	function handleProductTypeCreated(productType: ProductTypeResponse) {
		// Product type created successfully — could refresh types list if needed
		productTypes = [productType, ...productTypes];
		console.log('Product type created:', productType);
	}

	function handleCategoryCreated(category: CategoryResponse) {
		productCategories = [category, ...productCategories];
		console.log('Category created:', category);
	}

	onMount(async () => {
		products = await fetchProducts();
		productTypes = await fetchProductTypes();
		productCategories = await fetchCategories();
	});

	const rooms = $derived.by(() => ctx.domainGraph.layout.zones.flatMap((zone) => zone.rooms));
	// const roomProducts = $derived.by(() => rooms.flatMap((room) => room.products));
</script>

{#key showModalKey}
	<Modal bind:showModal title="Add Product to Room">
		<AddRoomProductForm {rooms} product={selectedProduct} bind:showModal />
	</Modal>
{/key}

<Modal bind:showModal={showCreateProductModal} title="Create New Product">
	<CreateProductForm
		{productTypes}
		bind:showModal={showCreateProductModal}
		onSuccess={handleProductCreated}
	/>
</Modal>

{#key showProductTypeModalKey}
	<Modal bind:showModal={showCreateProductTypeModal} title="Create New Product Type">
		<CreateProductTypeForm
			categories={productCategories}
			bind:showModal={showCreateProductTypeModal}
			onSuccess={handleProductTypeCreated}
		/>
	</Modal>
{/key}

{#key showProductCategoryModalKey}
	<Modal bind:showModal={showCreateCategoryModal} title="Create New Category">
		<CreateCategoryForm
			bind:showModal={showCreateCategoryModal}
			onSuccess={handleCategoryCreated}
		/>
	</Modal>
{/key}

<div class="w-full space-y-10 bg-background p-6">
	<!-- Search -->
	<div class="space-y-3">
		<label
			for="products-search"
			class="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
		>
			Search products
		</label>

		<form
			class="relative flex items-center rounded-xl border border-border bg-card transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-ring"
			onsubmit={searchProducts}
		>
			<Search class="ml-3 h-4 w-4 text-muted-foreground" />

			<input
				id="products-search"
				type="search"
				bind:value={search}
				placeholder="Search by name, category, or type"
				class="w-full bg-transparent px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none"
			/>

			<button
				type="submit"
				class="mr-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-primary opacity-90 transition-opacity hover:cursor-pointer hover:opacity-100"
			>
				Search
			</button>
		</form>
	</div>

	<!-- Global Catalogue -->
	<div class="space-y-3">
		<div class="flex items-center justify-between">
			<p class="text-sm font-semibold tracking-wide text-foreground">Global Catalogue</p>
			<div class="flex items-center gap-2">
				<button
					class="rounded-lg border border-primary px-4 py-2 text-xs font-semibold text-primary shadow-sm transition hover:bg-primary/5"
					onclick={() => (showCreateCategoryModal = true)}
				>
					Create Category
				</button>
				<button
					class="rounded-lg border border-primary px-4 py-2 text-xs font-semibold text-primary shadow-sm transition hover:bg-primary/5"
					onclick={() => (showCreateProductTypeModal = true)}
				>
					Create Product Type
				</button>
				<button
					class="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
					onclick={() => (showCreateProductModal = true)}
				>
					Create Product
				</button>
			</div>
		</div>

		<div class="overflow-hidden rounded-xl border border-border bg-card">
			<!-- Header -->
			<div
				class="grid grid-cols-7 border-b border-border bg-muted/40 px-4 py-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase"
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
					class="grid grid-cols-7 items-center border-b border-border/50 px-4 py-3 text-sm transition hover:bg-muted/30"
				>
					<div class="text-muted-foreground">{p.category_name}</div>

					<div class="col-span-2 font-medium text-foreground">
						{p.name}
					</div>

					<div class="text-muted-foreground">{p.type_name}</div>

					<div class="text-muted-foreground">{p.model_number}</div>

					<div class="text-right font-medium text-foreground">{p.price}</div>

					<div class="text-right">
						<button
							class="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:cursor-pointer hover:bg-primary/20"
							onclick={() => showAddRoomProductModal(p)}
						>
							Add
						</button>
					</div>
				</div>
			{/each}

			{#if products.length === 0}
				<div class="px-6 py-12 text-center text-sm text-muted-foreground">
					Start typing to search the catalogue
				</div>
			{/if}
		</div>
	</div>
</div>
