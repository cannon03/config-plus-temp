<script lang="ts">
	import type { RoomProductRequest } from '$lib/types/product';
	import type { RoomResponse } from '$lib/types/room';
	import type { ProductResponse } from '$lib/types/product';
	import { createRoomProduct } from '$lib/api/room_product';
	import { Save, Search } from 'lucide-svelte';
	let {
		rooms,
		product,
		showModal = $bindable(false)
	}: {
		rooms: Array<RoomResponse>;
		product?: ProductResponse;
		showModal?: boolean;
	} = $props();
	let roomProductRequest = $state<RoomProductRequest>({
		room: rooms[0]?.id ?? 0,
		product: product?.id ?? 0,
		quantity: 1,
		notes: ''
	});
	async function handleSubmit(e: Event) {
		e.preventDefault();
		await createRoomProduct(roomProductRequest);
		showModal = false;
	}
</script>

<form class="flex flex-col gap-8 rounded-2xl bg-white p-2 transition-all">
	<!-- Room -->
	<div class="flex flex-col gap-2">
		<label for="select-room" class="text-sm font-medium text-gray-800">Room</label>
		<select
			class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
			id="select-room"
		>
			{#each rooms as room}
				<option value={room.id}>{room.name}</option>
			{/each}
		</select>
	</div>

	<!-- Selected Product -->
	{#if product}
		<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
			<div class="flex items-start justify-between">
				<div>
					<p class="text-sm font-semibold text-gray-900">{product.name}</p>
					<p class="text-xs text-gray-500">
						{product.category_name} · {product.type_name} · {product.model_number}
					</p>
				</div>

				<p class="text-sm font-semibold text-blue-600">{product.price}</p>
			</div>

			<div class="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-600">
				<div>
					<span class="font-medium text-gray-700">Material:</span>
					{product.specifications.material}
				</div>
				<div>
					<span class="font-medium text-gray-700">Depth:</span>
					{product.specifications.depth}
				</div>
				<div>
					<span class="font-medium text-gray-700">Modules:</span>
					{product.specifications.modules}
				</div>
			</div>
		</div>

		<!-- Quantity -->
		<div class="flex flex-col gap-2">
			<label for="quantity" class="text-sm font-medium text-gray-800">Quantity</label>
			<input
				type="number"
				min="1"
				value="1"
				class="w-28 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				id="quantity"
			/>
		</div>

		<!-- Notes -->
		<div class="flex flex-col gap-2">
			<label for="notes" class="text-sm font-medium text-gray-800">Notes</label>
			<textarea
				rows="3"
				placeholder="Optional installation or placement notes"
				class="resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				id="notes"
			></textarea>
		</div>

		<!-- Price Summary -->
		<div class="rounded-xl border border-blue-200 bg-blue-50 p-4">
			<div class="flex items-center justify-between">
				<p class="text-sm font-medium text-gray-700">Unit Price</p>
				<p class="text-sm font-semibold text-gray-900">{product.price}</p>
			</div>

			<div class="mt-2 flex items-center justify-between">
				<p class="text-sm font-medium text-gray-700">Total</p>
				<p class="text-lg font-bold text-blue-600">
					{Number(product.price) * roomProductRequest.quantity}
				</p>
			</div>
		</div>
	{/if}
	<!-- Submit -->
	<div class="mt-2 flex justify-end">
		<button
			type="submit"
			class="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
			onclick={handleSubmit}
		>
			<Save class="h-4 w-4" />
			Add Product
		</button>
	</div>
</form>
