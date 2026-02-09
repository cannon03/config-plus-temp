<script lang="ts">
	import { createCustomLedMapping } from '$lib/api/led_config';
	import Button from '$lib/components/base/Button.svelte';
	import type { CustomLedMappingRequest, LedTarget } from '$lib/types/domain_graph';
	import type { Unit } from '$lib/types/unit';
	import { Plus, Save, Trash2 } from 'lucide-svelte';

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
	let selectedTriggerDevice = $state<AvailableDevice | null>(availableDevices[0] ?? null);
	let triggerKey = $state(1);
	let triggerState = $state<0 | 1>(1);

	let ledTargets = $state<Array<{ device: AvailableDevice | null; key: number; state: 0 | 1 }>>([
		{ device: availableDevices[0] ?? null, key: 1, state: 1 }
	]);

	function addTarget() {
		ledTargets = [...ledTargets, { device: availableDevices[0] ?? null, key: 1, state: 1 }];
	}

	function removeTarget(index: number) {
		ledTargets = ledTargets.filter((_, i) => i !== index);
	}

	function getDeviceByAddress(address: number): AvailableDevice | null {
		return availableDevices.find((d) => d.address === address) ?? null;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!selectedTriggerDevice) return;
		if (ledTargets.length === 0) return;

		const targets: LedTarget[] = ledTargets
			.filter((t) => t.device !== null)
			.map((t) => ({
				address: t.device!.address,
				key: t.key,
				state: t.state
			}));

		const request: CustomLedMappingRequest = {
			unit: unit.id,
			name: name || `Mapping ${selectedTriggerDevice.address}-${triggerKey}`,
			x_address: selectedTriggerDevice.address,
			x_key: triggerKey,
			x_state: triggerState,
			led_targets: targets
		};

		await createCustomLedMapping(request);
		showModal = false;
	}

	const triggerMaxKeys = $derived(selectedTriggerDevice?.maxKeys ?? 6);
</script>

<form onsubmit={handleSubmit} class="flex flex-col gap-6 rounded-2xl bg-white p-2 transition-all">
	<!-- Name -->
	<div class="flex flex-col gap-2">
		<label for="mapping-name" class="text-sm font-medium text-gray-800">Name (optional)</label>
		<input
			type="text"
			id="mapping-name"
			bind:value={name}
			placeholder="e.g., Corridor sync"
			class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
		/>
	</div>

	<!-- Trigger Section -->
	<fieldset class="rounded-lg border border-gray-200 p-4">
		<legend class="px-2 text-sm font-semibold text-gray-700">Trigger (When this happens...)</legend>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<!-- Trigger Device -->
			<div class="flex flex-col gap-2">
				<label for="trigger-device" class="text-sm font-medium text-gray-800">Device</label>
				<select
					id="trigger-device"
					bind:value={selectedTriggerDevice}
					class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				>
					{#each availableDevices as device}
						<option value={device}>{device.name} (Addr: {device.address})</option>
					{/each}
				</select>
			</div>

			<!-- Trigger Key -->
			<div class="flex flex-col gap-2">
				<label for="trigger-key" class="text-sm font-medium text-gray-800">Key</label>
				<select
					id="trigger-key"
					bind:value={triggerKey}
					class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				>
					{#each Array.from({ length: triggerMaxKeys }, (_, i) => i + 1) as keyNum}
						<option value={keyNum}>Key {keyNum}</option>
					{/each}
				</select>
			</div>

			<!-- Trigger State -->
			<div class="flex flex-col gap-2">
				<label for="trigger-state" class="text-sm font-medium text-gray-800">State</label>
				<select
					id="trigger-state"
					bind:value={triggerState}
					class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				>
					<option value={1}>On</option>
					<option value={0}>Off</option>
				</select>
			</div>
		</div>
	</fieldset>

	<!-- LED Targets Section -->
	<fieldset class="rounded-lg border border-gray-200 p-4">
		<legend class="px-2 text-sm font-semibold text-gray-700">LED Targets (Set these LEDs...)</legend
		>

		<div class="space-y-3">
			{#each ledTargets as target, index}
				<div class="flex items-end gap-3 rounded-lg bg-gray-50 p-3">
					<!-- Target Device -->
					<div class="flex flex-1 flex-col gap-1">
						<label for="target-device-{index}" class="text-xs font-medium text-gray-600"
							>Device</label
						>
						<select
							id="target-device-{index}"
							bind:value={target.device}
							class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						>
							{#each availableDevices as device}
								<option value={device}>{device.name} (Addr: {device.address})</option>
							{/each}
						</select>
					</div>

					<!-- Target Key -->
					<div class="flex w-24 flex-col gap-1">
						<label for="target-key-{index}" class="text-xs font-medium text-gray-600">Key</label>
						<select
							id="target-key-{index}"
							bind:value={target.key}
							class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						>
							{#each Array.from({ length: target.device?.maxKeys ?? 6 }, (_, i) => i + 1) as keyNum}
								<option value={keyNum}>{keyNum}</option>
							{/each}
						</select>
					</div>

					<!-- Target State -->
					<div class="flex w-20 flex-col gap-1">
						<label for="target-state-{index}" class="text-xs font-medium text-gray-600">State</label
						>
						<select
							id="target-state-{index}"
							bind:value={target.state}
							class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
						>
							<option value={1}>On</option>
							<option value={0}>Off</option>
						</select>
					</div>

					<!-- Remove Button -->
					<button
						type="button"
						onclick={() => removeTarget(index)}
						disabled={ledTargets.length <= 1}
						class="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
					>
						<Trash2 class="h-4 w-4" />
					</button>
				</div>
			{/each}

			<button
				type="button"
				onclick={addTarget}
				class="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
			>
				<Plus class="h-4 w-4" />
				Add LED Target
			</button>
		</div>
	</fieldset>

	<!-- Submit -->
	<div class="mt-2 flex justify-end">
		<Button
			type="submit"
			variant="saveform"
			class="flex items-center gap-2 px-5 py-2.5 text-sm"
			disabled={!selectedTriggerDevice || ledTargets.length === 0}
		>
			<Save class="h-4 w-4" />
			Create Mapping
		</Button>
	</div>
</form>
