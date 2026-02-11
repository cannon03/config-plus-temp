<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import type { Unit } from '$lib/types/unit';
	import { downloadElectricalLayout, downloadRCUMappings } from '$lib/utils/download';
	import { Download, ChevronDown } from 'lucide-svelte';
	const { unit }: { unit: Unit } = $props();
	async function getElectricalLayout() {
		downloadElectricalLayout(unit.id, unit.name);
	}

	let isDropdownOpen = $state(false);

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function closeDropdown() {
		isDropdownOpen = false;
	}

	async function handleDownload(type: string) {
		closeDropdown();
		await downloadRCUMappings(unit.id, unit.name, type);
	}
</script>

<svelte:window
	onclick={(e) => {
		if (isDropdownOpen && !(e.target as Element).closest('.relative')) {
			closeDropdown();
		}
	}}
/>

<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
	<h3 class="mb-4 text-lg font-semibold text-gray-900">Actions</h3>

	<div class="space-y-3">
		<Button
			variant="standard"
			class="flex w-full items-center justify-between rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
			onclick={getElectricalLayout}
		>
			<span>Electrical Layout</span>
			<Download class="h-4 w-4 opacity-90" />
		</Button>

		<div class="relative">
			<button
				class="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
				onclick={toggleDropdown}
			>
				<span>RCU Mappings</span>
				<div class="flex items-center gap-2">
					<span class="text-xs font-normal text-gray-500">Select Format</span>
					<ChevronDown
						class="h-4 w-4 text-gray-500 transition-transform duration-200 {isDropdownOpen
							? 'rotate-180'
							: ''}"
					/>
				</div>
			</button>

			{#if isDropdownOpen}
				<div
					class="absolute top-full right-0 left-0 z-10 mt-1 animate-in overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black/5 duration-100 zoom-in-95 fade-in"
				>
					<button
						class="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
						onclick={() => handleDownload('v3')}
					>
						<span>V3 Format (JSON)</span>
						<span class="text-xs text-gray-400">Default</span>
					</button>
					<button
						class="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
						onclick={() => handleDownload('v2_json')}
					>
						<span>V2 Format (Text)</span>
						<span class="text-xs text-gray-400">Legacy</span>
					</button>
					<button
						class="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
						onclick={() => handleDownload('v2_header')}
					>
						<span>V2 Header (.h)</span>
						<span class="text-xs text-gray-400">C Header</span>
					</button>
					<div class="my-1 h-px bg-gray-100"></div>
					<button
						class="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
						onclick={() => handleDownload('all')}
					>
						<span>Download All</span>
						<Download class="h-3.5 w-3.5 opacity-50" />
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
