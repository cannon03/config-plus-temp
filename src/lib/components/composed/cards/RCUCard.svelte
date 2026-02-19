<script lang="ts">
	import { Cpu, Trash2, Pencil, Plus } from 'lucide-svelte';
	import MappedChannelList from '$lib/components/composed/lists/MappedChannelList.svelte';
	import DinModuleList from '$lib/components/composed/lists/DinModuleList.svelte';
	import Modal from '../modals/Modal.svelte';
	import { deleteRCU } from '$lib/api/rcu';
	import RCUForm from '../forms/RCUForm.svelte';
	import { RCU_ACCEPTED_LOAD_TYPES, RCU_FORM_TYPES } from '$lib/constants/rcu';
	import MapChannelForm from '../forms/MapChannelForm.svelte';
	import { CHANNEL_CONTENT_TYPES } from '$lib/constants/channel';
	import type { Unit } from '$lib/types/unit';
	import type { RCUResponse } from '$lib/types/rcu';
	import type { LoadResponse } from '$lib/types/load';
	import DinModuleForm from '../forms/DinModuleForm.svelte';
	import { DIN_MODULE_FORM_TYPES } from '$lib/constants/din_module';
	import type { RoomResponse } from '$lib/types/room';

	const {
		unit,
		rcu,
		loads,
		rooms
	}: {
		unit: Unit;
		rcu: RCUResponse;
		loads: Array<LoadResponse>;
		rooms: Array<RoomResponse>;
	} = $props();

	const totalChannels = rcu.channel_count;

	let showDelModal = $state(false);
	let showModal = $state(false);
	let showAddModuleModal = $state(false);
	let showMapChannelModal = $state(false);

	// Use channels directly from the RCU object
	const rcuChannels = $derived.by(() => rcu.channels || []);
	const rcuModules = $derived.by(() => rcu.din_modules || []);

	const usedChannels = $derived.by(() => rcuChannels.map((ch) => ch.channel_number));

	// compute available channels
	const availableChannels = $derived.by(() =>
		Array.from({ length: totalChannels }, (_, i) => i + 1).filter(
			(num) => !usedChannels.includes(num)
		)
	);

	// Get all used load IDs from RCU channels and DIN module channels
	const usedLoadIds = $derived.by(() => {
		const rcuLoadIds = rcuChannels.map((ch) => ch.load_id);
		const dinLoadIds = rcuModules.flatMap((m) => (m.channels || []).map((ch) => ch.load_id));
		return new Set([...rcuLoadIds, ...dinLoadIds]);
	});

	const availableLoads = $derived.by(() => loads.filter((load) => !usedLoadIds.has(load.id)));
	const availiableLoadsRCU = $derived.by(() =>
		availableLoads.filter((load) => RCU_ACCEPTED_LOAD_TYPES.includes(load.load_type))
	);
	const usedAddresses = $derived.by(() => new Set(rcuModules.map((module) => module.address)));
	const availableAddresses = $derived.by(() =>
		Array.from({ length: rcu.channel_count }, (_, i) => i + 1).filter(
			(num) => !usedAddresses.has(num)
		)
	);

	async function del(e: Event) {
		await deleteRCU(rcu.id);
		showDelModal = false;
	}
</script>

<Modal bind:showModal={showDelModal} title="Delete RCU">
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-muted-foreground">Are you sure you want to delete this RCU?</p>
		<div class="mt-4 flex gap-3">
			<button
				class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-red-700"
				onclick={del}>Yes, Delete</button
			>
			<button
				class="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
				>Cancel</button
			>
		</div>
	</div>
</Modal>

<Modal title="Edit RCU" bind:showModal>
	<RCUForm type={RCU_FORM_TYPES.EDIT} {unit} bind:showModal {rcu} />
</Modal>

{#key availableChannels || availiableLoadsRCU}
	<Modal title="Map Channel" bind:showModal={showMapChannelModal}>
		<MapChannelForm
			objectId={rcu.id}
			content_type={CHANNEL_CONTENT_TYPES.RCU}
			loads={availiableLoadsRCU}
			channels={availableChannels}
			{rooms}
			bind:showModal={showMapChannelModal}
		/>
	</Modal>
{/key}

<Modal title="Add Module" bind:showModal={showAddModuleModal}>
	<DinModuleForm
		type={DIN_MODULE_FORM_TYPES.CREATE}
		addresses={availableAddresses}
		{rcu}
		bind:showModal={showAddModuleModal}
	/>
</Modal>

<div class="rounded-lg border border-border">
	<!-- Header -->
	<div class="flex items-center justify-between border-b border-border bg-muted/50 p-4">
		<div class="flex items-center space-x-3">
			<Cpu class="h-5 w-5 text-primary" />
			<div>
				<h5 class="font-medium text-foreground">RCU - {rcu.name}</h5>
				<p class="text-sm text-muted-foreground">{rcu.channel_count} channels</p>
			</div>
		</div>

		<div class="flex items-center space-x-1">
			<button
				class="text-xs text-primary hover:opacity-80"
				onclick={() => (showMapChannelModal = true)}>Map Channel</button
			>
			<button
				class="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
				onclick={() => (showModal = true)}
				title="Edit RCU"
			>
				<Pencil class="h-4 w-4" />
			</button>
			<button
				class="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600"
				onclick={() => (showDelModal = true)}
				title="Delete RCU"
			>
				<Trash2 class="h-4 w-4" />
			</button>
		</div>
	</div>

	<!-- Channel Mapping -->
	<div class="space-y-3 pt-3 pl-3">
		<span class="p-4 text-xs font-medium text-foreground">Channel Mapping</span>
		<MappedChannelList channels={rcuChannels} {loads} />
	</div>

	<!-- DIN Modules -->
	<div class="p-4">
		<div class="mb-4 flex items-center justify-between">
			<h6 class="text-sm font-medium text-foreground">DIN Modules</h6>
			<button
				class="inline-flex items-center rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
				onclick={() => (showAddModuleModal = true)}
			>
				<Plus class="mr-1 h-3 w-3" /> Add Module
			</button>
		</div>

		<DinModuleList modules={rcuModules} {loads} {availableLoads} {rooms} />
	</div>
</div>
