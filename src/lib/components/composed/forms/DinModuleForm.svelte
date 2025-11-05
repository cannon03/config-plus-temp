<script lang="ts">
	import { DIN_MODULE_FORM_TYPES, DIN_MODULE_TYPES } from '$lib/constants/din_module';
	import Button from '$lib/components/base/Button.svelte';
	import { Save } from 'lucide-svelte';
	import type { RCUResponse } from '$lib/types/rcu';
	import type { DinModuleRequest, DinModuleResponse } from '$lib/types/din_module';
	import { createDinModule, updateDinModule } from '$lib/api/din_module';

	let {
		rcu,

		addresses,
		din_module,
		type,
		showModal = $bindable(false)
	}: {
		rcu: RCUResponse;
		addresses: Array<number>;
		din_module?: DinModuleResponse;
		type: (typeof DIN_MODULE_FORM_TYPES)[keyof typeof DIN_MODULE_FORM_TYPES];
		showModal: boolean;
	} = $props();

	let module_type = $state<keyof typeof DIN_MODULE_TYPES>(DIN_MODULE_TYPES.phase_cut.key);

	let dinModuleRequest = $derived.by<DinModuleRequest>(() => ({
		rcu: rcu.id,
		module_type: module_type,
		address: (din_module?.address ?? addresses.length > 0) ? addresses[0] : 0,
		dali_bus_count:
			(din_module?.dali_bus_count ?? module_type === DIN_MODULE_TYPES.dali_master.key)
				? 1
				: undefined
	}));

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (type === DIN_MODULE_FORM_TYPES.CREATE) {
			await createDinModule(dinModuleRequest);
		} else {
			await updateDinModule(din_module!.id, dinModuleRequest);
		}
		showModal = false;
	}
</script>

<form class="flex flex-col space-y-4" onsubmit={handleSubmit}>
	<div class="flex flex-col">
		<label for="module-type" class="text-sm font-medium text-gray-600">Module Type</label>
		<select
			name="module-type"
			bind:value={module_type}
			id="module-type"
			class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			{#each Object.entries(DIN_MODULE_TYPES) as [type, config]}
				<option value={type}>{config.label}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col">
		<label for="address-number" class="text-sm font-medium text-gray-600">Channel Count</label>
		<select
			bind:value={dinModuleRequest.address}
			name="address-number"
			id="address-number"
			class="mt-1 rounded-lg border bg-gray-200 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			{#each addresses as address}
				<option value={address}>Channel {address}</option>
			{/each}
		</select>
	</div>
	<div class="flex justify-end">
		<Button type="submit" variant="saveform"
			>{type === DIN_MODULE_FORM_TYPES.CREATE ? 'Create' : 'Update'} Module <Save
				class="h-4 w-4"
			/></Button
		>
	</div>
</form>
