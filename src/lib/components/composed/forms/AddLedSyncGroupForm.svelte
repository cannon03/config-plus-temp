<script lang="ts">
	import { createLedSyncGroup } from '$lib/api/led_config';
	import Button from '$lib/components/base/Button.svelte';
	import type { LedSyncGroupMember, LedSyncGroupRequest } from '$lib/types/domain_graph';
	import type { Unit } from '$lib/types/unit';
	import { Plus, Save, Trash2, Users } from 'lucide-svelte';

	interface AvailableDevice {
		address: number;
		name: string;
		maxKeys: number;
	}

	let {
		unit,
		availableDevices,
		showModal = $bindable(false)
	}: {
		unit: Unit;
		availableDevices: AvailableDevice[];
		showModal?: boolean;
	} = $props();

	let name = $state('');
	let members = $state<Array<{ device: AvailableDevice | null; key: number }>>([
		{ device: availableDevices[0] ?? null, key: 1 },
		{ device: availableDevices[1] ?? availableDevices[0] ?? null, key: 1 }
	]);

	function addMember() {
		members = [...members, { device: availableDevices[0] ?? null, key: 1 }];
	}

	function removeMember(index: number) {
		members = members.filter((_, i) => i !== index);
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (members.length < 2) return;

		const validMembers: LedSyncGroupMember[] = members
			.filter((m) => m.device !== null)
			.map((m) => ({
				address: m.device!.address,
				key: m.key
			}));

		if (validMembers.length < 2) return;

		const request: LedSyncGroupRequest = {
			unit: unit.id,
			name: name || `Sync Group ${validMembers.map((m) => m.address).join('-')}`,
			members: validMembers
		};

		await createLedSyncGroup(request);
		showModal = false;
	}
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-6 rounded-2xl bg-white p-2 transition-all">
	<!-- Name -->
	<div class="flex flex-col gap-2">
		<label for="group-name" class="text-sm font-medium text-gray-800">Group Name</label>
		<input
			type="text"
			id="group-name"
			bind:value={name}
			placeholder="e.g., Corridor DND Sync"
			class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
		/>
	</div>

	<!-- Info -->
	<div class="rounded-lg border border-blue-100 bg-blue-50 p-3">
		<div class="flex items-start gap-2">
			<Users class="mt-0.5 h-4 w-4 text-blue-500" />
			<div class="text-sm text-blue-700">
				<p class="font-medium">How Sync Groups Work</p>
				<p class="mt-1 text-blue-600">
					All members will sync their LED states. When any member is pressed, all other members'
					LEDs will update to match.
				</p>
			</div>
		</div>
	</div>

	<!-- Members Section -->
	<fieldset class="rounded-lg border border-gray-200 p-4">
		<legend class="px-2 text-sm font-semibold text-gray-700">Sync Group Members</legend>

		<div class="space-y-3">
			{#each members as member, index}
				<div class="flex items-end gap-3 rounded-lg bg-gray-50 p-3">
					<!-- Device -->
					<div class="flex flex-1 flex-col gap-1">
						<label for="member-device-{index}" class="text-xs font-medium text-gray-600"
							>Device</label
						>
						<select
							id="member-device-{index}"
							bind:value={member.device}
							class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						>
							{#each availableDevices as device}
								<option value={device}>{device.name} (Addr: {device.address})</option>
							{/each}
						</select>
					</div>

					<!-- Key -->
					<div class="flex w-24 flex-col gap-1">
						<label for="member-key-{index}" class="text-xs font-medium text-gray-600">Key</label>
						<select
							id="member-key-{index}"
							bind:value={member.key}
							class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						>
							{#each Array.from({ length: member.device?.maxKeys ?? 6 }, (_, i) => i + 1) as keyNum}
								<option value={keyNum}>{keyNum}</option>
							{/each}
						</select>
					</div>

					<!-- Remove Button -->
					<button
						type="button"
						onclick={() => removeMember(index)}
						disabled={members.length <= 2}
						class="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
						title="Remove member"
					>
						<Trash2 class="h-4 w-4" />
					</button>
				</div>
			{/each}

			<button
				type="button"
				onclick={addMember}
				class="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
			>
				<Plus class="h-4 w-4" />
				Add Member
			</button>
		</div>
	</fieldset>

	<!-- Submit -->
	<div class="mt-2 flex justify-end">
		<Button
			type="submit"
			variant="saveform"
			class="flex items-center gap-2 px-5 py-2.5 text-sm"
			disabled={members.filter((m) => m.device !== null).length < 2}
		>
			<Save class="h-4 w-4" />
			Create Sync Group
		</Button>
	</div>
</form>
