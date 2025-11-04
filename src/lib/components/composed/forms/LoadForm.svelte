<script lang="ts">
	import type { DriverInfo, LoadRequestWithoutDriver, LoadResponse } from '$lib/types/load';
	import type { RoomResponse } from '$lib/types/room';
	import { DRIVER_TYPES, LOAD_DRIVER_REQUIRED_OPTIONS, LOAD_TYPES } from '$lib/constants/load';
	import Button from '$lib/components/base/Button.svelte';
	import { Save } from 'lucide-svelte';
	import { LOAD_MODAL_TYPES } from '$lib/constants/load';
	import { createLoad, updateLoad } from '$lib/api/load';
	import { RELOAD_TARGETS } from '$lib/constants/dashboard';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let {
		load,
		room,
		formType,
		showModal = $bindable(false)
	}: { load?: LoadResponse; room: RoomResponse; formType: string; showModal: boolean } = $props();
	const loadRequest = $state<LoadRequestWithoutDriver>({
		name: load?.name ?? '',
		description: load?.description ?? '',
		load_type: load?.load_type ?? '',
		quantity: load?.quantity ?? 0,
		wattage_per_unit: load?.wattage_per_unit ?? 0,
		room: room.id,
		driver_required: load?.driver_required ?? false
	});

	const driverInfo = $state<DriverInfo>({
		driver_type: load?.driver_type ?? '',
		driver_model: load?.driver_model ?? '',
		loads_per_driver: load?.loads_per_driver ?? 0,
		supply_materials: load?.supply_materials ?? false
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		const payload = {
			...loadRequest,
			...(loadRequest.driver_required ? driverInfo : {})
		};
		if (formType === LOAD_MODAL_TYPES.CREATE) {
			await createLoad(payload);
		} else if (formType === LOAD_MODAL_TYPES.EDIT) {
			await updateLoad(load!.id, payload);
		}
		showModal = false;
	}
</script>

<form class="flex flex-col space-y-4" onsubmit={handleSubmit}>
	<!-- ROOM AND NAME -->
	<div class="grid grid-cols-2 gap-6">
		<div class="flex flex-col">
			<label for="room" class="text-sm font-medium text-gray-600">Room</label>
			<input
				type="text"
				id="room"
				bind:value={room.name}
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
				bind:value={loadRequest.name}
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
				bind:value={loadRequest.load_type}
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
				bind:value={loadRequest.quantity}
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
				bind:value={loadRequest.wattage_per_unit}
				class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
		<div class="flex flex-col">
			<label for="driver_required" class="text-sm font-medium text-gray-600">Driver Required</label>
			<select
				name="driver_required"
				id="driver_required"
				bind:value={loadRequest.driver_required}
				class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			>
				{#each Object.entries(LOAD_DRIVER_REQUIRED_OPTIONS) as [name, val]}
					<option value={val}>{name}</option>
				{/each}
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
					bind:value={driverInfo.driver_type}
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
					bind:value={driverInfo.loads_per_driver}
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
					bind:value={driverInfo.driver_model}
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
					bind:value={driverInfo.supply_materials}
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
			bind:value={loadRequest.description}
			class="mt-1 w-full rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		></textarea>
	</div>
	<div class="flex justify-end">
		<Button type="submit" variant="loadform"
			>{formType === LOAD_MODAL_TYPES.CREATE ? 'Create' : 'Update'} Load <Save
				class="h-4 w-4"
			/></Button
		>
	</div>
</form>
