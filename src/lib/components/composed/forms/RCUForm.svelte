<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import { Save } from 'lucide-svelte';
	import { ROOM_FORM_TYPES } from '$lib/constants/room';
	import type { Unit } from '$lib/types/unit';
	import type { RCURequest, RCUResponse } from '$lib/types/rcu';
	import { CHANNEL_COUNTS, RCU_FORM_TYPES } from '$lib/constants/rcu';
	import { createRCU, updateRCU } from '$lib/api/rcu';

	let {
		unit,
		rcu,
		showModal = $bindable(false),
		type
	}: {
		unit: Unit;
		rcu?: RCUResponse;
		showModal: boolean;
		type: (typeof RCU_FORM_TYPES)[keyof typeof RCU_FORM_TYPES];
	} = $props();

	let rcuRequest = $state<RCURequest>({
		unit: unit.id,
		name: rcu?.name ?? '',
		channel_count: CHANNEL_COUNTS[0]
	});
	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (type === RCU_FORM_TYPES.CREATE) {
			await createRCU(rcuRequest);
		} else if (type === RCU_FORM_TYPES.EDIT) {
			await updateRCU(rcu!.id, rcuRequest);
		}
		showModal = false;
	}
</script>

<form class="flex flex-col space-y-4" onsubmit={handleSubmit}>
	<div class="flex flex-col">
		<label for="unit-name" class="text-sm font-medium text-gray-600">Unit</label>
		<input
			type="text"
			name="unit-name"
			bind:value={rcuRequest.name}
			id="unit-name"
			class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</div>
	<div class="flex flex-col">
		<label for="channel-count" class="text-sm font-medium text-gray-600">Channel Count</label>
		<select
			disabled
			bind:value={rcuRequest.channel_count}
			name="channel-count"
			id="channel-count"
			class="mt-1 rounded-lg border bg-gray-200 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			{#each CHANNEL_COUNTS as count}
				<option value={count}>{count}</option>
			{/each}
		</select>
	</div>
	<div class="flex justify-end">
		<Button type="submit" variant="saveform"
			>{type === RCU_FORM_TYPES.CREATE ? 'Create' : 'Update'} Room <Save class="h-4 w-4" /></Button
		>
	</div>
</form>
