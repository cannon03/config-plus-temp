<script lang="ts">
	import { getDashboardContext } from '$lib/context/dashboard';
	import { Link2, Plus, Users } from 'lucide-svelte';
	import CustomLedMappingCard from '$lib/components/composed/cards/CustomLedMappingCard.svelte';
	import LedSyncGroupCard from '$lib/components/composed/cards/LedSyncGroupCard.svelte';
	import Modal from '../modals/Modal.svelte';
	import AddCustomLedMappingForm from '../forms/AddCustomLedMappingForm.svelte';
	import AddLedSyncGroupForm from '../forms/AddLedSyncGroupForm.svelte';

	const ctx = getDashboardContext();
	let showMappingModal = $state(false);
	let showSyncGroupModal = $state(false);

	const customMappings = $derived(ctx.domainGraph.layout.custom_led_mappings ?? []);
	const syncGroups = $derived(ctx.domainGraph.layout.led_sync_groups ?? []);

	// Build available devices from keypads, logic boards, and key cards
	const availableDevices = $derived.by(() => {
		const rooms = ctx.domainGraph.layout.zones.flatMap((z) => z.rooms);
		const keypads = rooms.flatMap((r) => r.keypads ?? []);
		const logicBoards = rooms.flatMap((r) => r.logic_boards ?? []);
		const keyCards = rooms.flatMap((r) => r.keycards ?? []);

		const devices: Array<{ address: number; name: string; maxKeys: number }> = [];

		for (const k of keypads) {
			devices.push({
				address: k.address,
				name: `Keypad ${k.address}`,
				maxKeys: k.num_keys
			});
		}

		for (const lb of logicBoards) {
			devices.push({
				address: lb.address,
				name: `Logic Board ${lb.address}`,
				maxKeys: 6
			});
		}

		for (const kc of keyCards) {
			devices.push({
				address: kc.address,
				name: `Key Card ${kc.address}`,
				maxKeys: 6
			});
		}

		// Sort by address for consistency
		return devices.sort((a, b) => a.address - b.address);
	});
</script>

<!-- Modals -->
<Modal bind:showModal={showMappingModal} title="Create Custom LED Mapping">
	<AddCustomLedMappingForm
		unit={ctx.domainGraph.unit}
		{availableDevices}
		bind:showModal={showMappingModal}
	/>
</Modal>

<Modal bind:showModal={showSyncGroupModal} title="Create LED Sync Group">
	<AddLedSyncGroupForm
		unit={ctx.domainGraph.unit}
		{availableDevices}
		bind:showModal={showSyncGroupModal}
	/>
</Modal>

<div class="space-y-8">
	<!-- No Devices Warning -->
	{#if availableDevices.length === 0}
		<div class="rounded-lg bg-white p-8 text-center">
			<Link2 class="mx-auto mb-4 h-12 w-12 text-gray-300" />
			<h5 class="mb-2 text-sm font-medium text-gray-900">No devices available</h5>
			<p class="text-sm text-gray-500">
				Add keypads, logic boards, or key cards to create LED configurations
			</p>
		</div>
	{:else}
		<!-- LED Sync Groups Section -->
		<div class="rounded-lg bg-white p-4">
			<div class="mb-6 flex items-center justify-between">
				<div>
					<div class="flex items-center gap-2">
						<Users class="h-5 w-5 text-green-500" />
						<h3 class="text-lg font-medium text-gray-900">LED Sync Groups</h3>
						<span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
							Easy
						</span>
					</div>
					<p class="mt-1 text-sm text-gray-500">
						Sync LEDs across multiple devices — all members update together
					</p>
				</div>
				<button
					onclick={() => (showSyncGroupModal = true)}
					class="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:cursor-pointer hover:bg-green-700"
				>
					<Plus class="mr-2 h-4 w-4" />
					Add Sync Group
				</button>
			</div>

			{#if syncGroups.length > 0}
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each syncGroups as group (group.id)}
						<LedSyncGroupCard {group} />
					{/each}
				</div>
			{:else}
				<div class="rounded-lg border-2 border-dashed border-gray-200 py-8 text-center">
					<Users class="mx-auto mb-3 h-10 w-10 text-gray-300" />
					<p class="text-sm text-gray-500">No sync groups created yet</p>
					<button
						onclick={() => (showSyncGroupModal = true)}
						class="mt-3 text-sm font-medium text-green-600 hover:text-green-700"
					>
						Create your first sync group →
					</button>
				</div>
			{/if}
		</div>

		<!-- Custom LED Mappings Section -->
		<div class="rounded-lg bg-white p-4">
			<div class="mb-6 flex items-center justify-between">
				<div>
					<div class="flex items-center gap-2">
						<Link2 class="h-5 w-5 text-blue-500" />
						<h3 class="text-lg font-medium text-gray-900">Custom LED Mappings</h3>
						<span
							class="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700"
						>
							Advanced
						</span>
					</div>
					<p class="mt-1 text-sm text-gray-500">
						Full control — define exact trigger conditions and LED responses
					</p>
				</div>
				<button
					onclick={() => (showMappingModal = true)}
					class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:cursor-pointer hover:bg-blue-700"
				>
					<Plus class="mr-2 h-4 w-4" />
					Add Mapping
				</button>
			</div>

			{#if customMappings.length > 0}
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each customMappings as mapping (mapping.id)}
						<CustomLedMappingCard {mapping} />
					{/each}
				</div>
			{:else}
				<div class="rounded-lg border-2 border-dashed border-gray-200 py-8 text-center">
					<Link2 class="mx-auto mb-3 h-10 w-10 text-gray-300" />
					<p class="text-sm text-gray-500">No custom mappings created yet</p>
					<button
						onclick={() => (showMappingModal = true)}
						class="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
					>
						Create your first mapping →
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>
