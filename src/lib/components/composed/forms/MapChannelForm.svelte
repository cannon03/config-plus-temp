<script lang="ts">
	import type { ChannelRequest, ChannelResponse } from '$lib/types/channel';
	import type { LoadResponse } from '$lib/types/load';
	import { DIN_MODULE_TYPES } from '$lib/constants/din_module';
	import type { CHANNEL_CONTENT_TYPES } from '$lib/constants/channel';
	import Button from '$lib/components/base/Button.svelte';
	import { Save } from 'lucide-svelte';
	import { createChannel } from '$lib/api/channel';

	let {
		objectId,
		content_type,
		channels,
		loads,
		moduleData,
		showModal = $bindable(false)
	}: {
		objectId: number;
		content_type: (typeof CHANNEL_CONTENT_TYPES)[keyof typeof CHANNEL_CONTENT_TYPES];
		channels: Array<number>;
		loads: Array<LoadResponse>;
		moduleData?: keyof typeof DIN_MODULE_TYPES;
		showModal: boolean;
	} = $props();

	let channelRequest = $state<ChannelRequest>({
		object_id: objectId,
		content_type: content_type,
		channel_number: channels.length > 0 ? channels[0] : 0,
		load: loads.length > 0 ? loads[0].id : 0,
		bus_no: moduleData === DIN_MODULE_TYPES.dali_master.key ? 1 : undefined
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		await createChannel(channelRequest);
		showModal = false;
	}
</script>

<form class="flex flex-col space-y-4" onsubmit={handleSubmit}>
	<div class="flex flex-col">
		<label for="load-name" class="text-sm font-medium text-gray-600">Load</label>
		<select
			name="load-name"
			bind:value={channelRequest.load}
			id="load-name"
			class="mt-1 rounded-lg border px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			{#each loads as load}
				<option value={load.id}>{load.name}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col">
		<label for="channel-number" class="text-sm font-medium text-gray-600">Channel Count</label>
		<select
			bind:value={channelRequest.channel_number}
			name="channel-number"
			id="channel-number"
			class="mt-1 rounded-lg border bg-gray-200 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		>
			{#each channels as count}
				<option value={count}>Channel {count}</option>
			{/each}
		</select>
	</div>
	<div class="flex justify-end">
		<Button type="submit" variant="saveform">Create Mapping <Save class="h-4 w-4" /></Button>
	</div>
</form>
