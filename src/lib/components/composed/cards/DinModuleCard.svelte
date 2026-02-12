<script lang="ts">
	import { Pencil, Trash2 } from 'lucide-svelte';
	import { DIN_MODULE_TYPES } from '$lib/constants/din_module';
	import MappedChannelList from '$lib/components/composed/lists/MappedChannelList.svelte';

	import type { DinModuleResponse } from '$lib/types/din_module';
	import type { LoadResponse } from '$lib/types/load';
	import Modal from '../modals/Modal.svelte';
	import { deleteDinModule } from '$lib/api/din_module';
	import MapChannelForm from '../forms/MapChannelForm.svelte';
	import { CHANNEL_CONTENT_TYPES } from '$lib/constants/channel';
	import type { RoomResponse } from '$lib/types/room';

	const {
		module,
		loads,
		availableLoads,
		rooms
	}: {
		module: DinModuleResponse;
		loads: Array<LoadResponse>;
		availableLoads: Array<LoadResponse>;
		rooms: Array<RoomResponse>;
	} = $props();

	const moduleData = DIN_MODULE_TYPES[module.module_type];
	const Icon = moduleData.icon;

	let showDelModal = $state(false);
	let showMapModal = $state(false);

	// Use channels directly from the module object
	const moduleChannels = $derived.by(() => module.channels || []);

	const usedChannels = $derived.by(() => moduleChannels.map((ch) => ch.channel_number));

	// compute available ones
	const availableChannels = $derived.by(() =>
		Array.from({ length: moduleData.channels }, (_, i) => i + 1).filter(
			(num) => !usedChannels.includes(num)
		)
	);

	const filteredLoads = $derived.by(() =>
		availableLoads.filter(
			(load) => moduleData.accepted_loads.includes(load.load_type)
		)
	);

	async function del(e: Event) {
		e.preventDefault();
		await deleteDinModule(module.id);
		showDelModal = false;
	}
</script>

<Modal title="Delete Module" bind:showModal={showDelModal}>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-gray-600">Are you sure you want to delete this module?</p>
		<div class="mt-4 flex gap-3">
			<button
				class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-red-700"
				onclick={del}>Yes, Delete</button
			>
			<button
				class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
				>Cancel</button
			>
		</div>
	</div>
</Modal>

<Modal title="Add Mapping" bind:showModal={showMapModal}>
	<MapChannelForm
		objectId={module.id}
		{rooms}
		content_type={CHANNEL_CONTENT_TYPES.DIN}
		channels={availableChannels}
		loads={filteredLoads}
		bind:showModal={showMapModal}
	/>
</Modal>

<div class="rounded-lg border border-gray-200 p-3">
	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-3">
			<Icon class="h-5 w-5 text-blue-600" />
			<div>
				<p class="text-sm font-medium text-gray-900">
					{moduleData.label} - Address {module.address}
				</p>
				<p class="text-xs text-gray-500">{moduleData.channels} channels</p>
			</div>
		</div>

		<div class="flex items-center space-x-1">
			<button class="rounded p-1 text-gray-400 hover:text-gray-600" title="Edit module">
				<Pencil class="h-3 w-3" />
			</button>
			<button
				class="rounded p-1 text-gray-400 hover:text-red-600"
				title="Delete module"
				onclick={() => (showDelModal = true)}
			>
				<Trash2 class="h-3 w-3" />
			</button>
		</div>
	</div>

	<div class="mt-3 border-t border-gray-100 pt-3">
		<div class="mb-2 flex items-center justify-between">
			<span class="text-xs font-medium text-gray-700">Channel Mapping</span>
			<button
				class="text-xs text-blue-600 hover:cursor-pointer hover:text-blue-800"
				onclick={() => (showMapModal = true)}>Map Channel</button
			>
		</div>

		<MappedChannelList channels={moduleChannels} {loads} />
	</div>
</div>
