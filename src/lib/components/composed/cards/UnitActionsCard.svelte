<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import type { Unit } from '$lib/types/unit';
	import { downloadElectricalLayout, downloadRCUMappings } from '$lib/utils/download';
	import { Download } from 'lucide-svelte';
	const { unit }: { unit: Unit } = $props();
	async function getElectricalLayout() {
		downloadElectricalLayout(unit.id, unit.name);
	}

	async function getRCUMappings() {
		downloadRCUMappings(unit.id, unit.name);
	}
</script>

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

		<Button
			variant="white"
			class="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
			onclick={getRCUMappings}
		>
			<span>RCU Mappings (JSON)</span>
			<Download class="h-4 w-4 text-gray-600 opacity-80" />
		</Button>
	</div>
</div>
