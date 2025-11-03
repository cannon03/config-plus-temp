<script lang="ts">
	import type { LoadRequest, LoadResponse } from '$lib/types/load';
	import type { RoomResponse } from '$lib/types/room';
	import { DRIVER_TYPES, LOAD_TYPES } from '$lib/constants/load';

	const { load, room }: { load?: LoadResponse; room: RoomResponse } = $props();
	const loadRequest = $state<LoadRequest>({
		name: load?.name ?? '',
		description: load?.description ?? '',
		load_type: load?.load_type ?? '',
		quantity: load?.quantity ?? 0,
		wattage_per_unit: load?.wattage_per_unit ?? 0,
		room: room.id,
		driver_required: load?.driver_required ?? false,
		driver_type: load?.driver_type ?? '',
		driver_model: load?.driver_model ?? '',
		loads_per_driver: load?.loads_per_driver ?? 0,
		supply_materials: load?.supply_materials ?? false
	});
</script>

<form class="flex flex-col space-y-4">
	<!-- ROOM AND NAME -->
	<div class="grid grid-cols-2 gap-6">
		<div class="flex flex-col">
			<label for="room" class="text-sm font-medium text-gray-600">Room</label>
			<input
				type="text"
				id="room"
				value={room.name}
				disabled
				class="mt-1 cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-2 text-gray-600 shadow-sm"
			/>
		</div>
		<div class="flex flex-col">
			<label for="name" class="text-sm font-medium text-gray-600">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				value={loadRequest.name}
				class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
	</div>

	<!-- LOAD TYPE AND QUANTITY -->
	<div class="grid grid-cols-2 gap-6">
		<div class="flex flex-col">
			<label for="load_type" class="text-sm font-medium text-gray-600">Load Type</label>
			<select
				name="load_type"
				id="load_type"
				value={loadRequest.load_type}
				class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			>
				{#each Object.entries(LOAD_TYPES) as [type, config]}
					<option value={type}>{config.label}</option>
				{/each}
			</select>
		</div>
		<div class="flex flex-col">
			<label for="quantity" class="text-sm font-medium text-gray-600">Quantity</label>
			<input
				type="number"
				name="quantity"
				id="quantity"
				value={loadRequest.quantity}
				class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
	</div>

	<!-- DRIVER REQUIRED AND WATTAGE -->
	<div class="grid grid-cols-2 gap-6">
		<div class="flex flex-col">
			<label for="wattage_per_unit" class="text-sm font-medium text-gray-600"
				>Wattage Per Unit</label
			>
			<input
				type="number"
				name="wattage_per_unit"
				id="wattage_per_unit"
				value={loadRequest.wattage_per_unit}
				class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
		<div class="flex flex-col">
			<label for="driver_required" class="text-sm font-medium text-gray-600">Driver Required</label>
			<select
				name="driver_required"
				id="driver_required"
				value={loadRequest.driver_required}
				class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			>
				<option value={true}>Yes</option>
				<option value={false}>No</option>
			</select>
		</div>
	</div>

	{#if loadRequest.driver_required}
		<div class="grid grid-cols-2 gap-6">
			<div class="flex flex-col">
				<label for="driver_type" class="text-sm font-medium text-gray-600">Driver Type</label>
				<select
					name="driver_type"
					id="driver_type"
					value={loadRequest.driver_type}
					class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					{#each Object.entries(DRIVER_TYPES) as [type, name]}
						<option value={type}>{name}</option>
					{/each}
				</select>
			</div>
			<div class="flex flex-col">
				<label for="loads_per_driver" class="text-sm font-medium text-gray-600"
					>Loads Per Driver</label
				>
				<input
					type="number"
					name="loads_per_driver"
					id="loads_per_driver"
					value={loadRequest.loads_per_driver}
					class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-6">
			<div class="flex flex-col">
				<label for="driver_model" class="text-sm font-medium text-gray-600">Driver Model</label>
				<input
					type="text"
					name="driver_model"
					id="driver_model"
					value={loadRequest.driver_model}
					class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>
			<div class="flex flex-col">
				<label for="supply_materials" class="text-sm font-medium text-gray-600"
					>Supply Materials</label
				>
				<select
					name="supply_materials"
					id="supply_materials"
					value={loadRequest.supply_materials}
					class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					<option value={true}>Yes</option>
					<option value={false}>No</option>
				</select>
			</div>
		</div>
	{/if}

	<!-- DESCRIPTION -->
	<div class="flex flex-col items-start">
		<label for="description" class="text-sm font-medium text-gray-600">Description</label>
		<textarea
			name="description"
			id="description"
			value={loadRequest.description}
			class="mt-1 w-full rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		></textarea>
	</div>
</form>
