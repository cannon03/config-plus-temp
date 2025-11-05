<script lang="ts">
	import { createZone, updateZone } from '$lib/api/zone';
	import Button from '$lib/components/base/Button.svelte';
	import { ZONE_FORM_TYPES } from '$lib/constants/zone';
	import type { Unit } from '$lib/types/unit';
	import type { ZoneRequest, ZoneResponse } from '$lib/types/zone';
	import { Save } from 'lucide-svelte';
	let {
		unit,
		zone,
		type,
		showModal = $bindable(false)
	}: { unit: Unit; zone?: ZoneResponse; showModal: boolean; type: string } = $props();
	let zoneRequest = $state<ZoneRequest>({
		unit: unit.id,
		name: zone?.name ?? ''
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (type === ZONE_FORM_TYPES.CREATE) {
			await createZone(zoneRequest);
		} else if (type === ZONE_FORM_TYPES.EDIT) {
			await updateZone(zone!.id, zoneRequest);
		}

		showModal = false;
	}
</script>

<form class="flex flex-col space-y-4" onsubmit={handleSubmit}>
	<div class="flex flex-col">
		<label for="unit-name" class="text-sm font-medium text-gray-600">Unit</label>
		<input
			disabled
			type="text"
			name="unit-name"
			value={unit.name}
			id="unit-name"
			class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>
	<div class="flex flex-col">
		<label for="name" class="text-sm font-medium text-gray-600">Name</label>
		<input
			type="text"
			name="name"
			bind:value={zoneRequest.name}
			id="name"
			class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>
	<div class="flex justify-end">
		<Button type="submit" variant="saveform">Create Zone <Save class="h-4 w-4" /></Button>
	</div>
</form>
