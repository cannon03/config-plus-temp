<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	import { fetchUnits } from '$lib/api/unit';
	import ListUnitsDashboardCard from '$lib/components/composed/cards/ListUnitsDashboardCard.svelte';

	import type { Unit } from '$lib/types/unit';
	import { Download } from 'lucide-svelte';
	import { downloadBillOfMaterials } from '$lib/utils/download';

	const projectId = Number(page.params.id);
	let units = $state<Array<Unit>>([]);

	onMount(async () => {
		const allUnits = await fetchUnits();
		units = allUnits.filter((u) => u.project === projectId);
	});

	async function getBillOfMaterials() {
		downloadBillOfMaterials(projectId, 'BOM');
	}
</script>

<!-- Header + Button Row -->
<div class="mb-4 flex items-center justify-between">
	<h2 class="text-lg font-semibold">Units</h2>

	<button
		class="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100"
		onclick={getBillOfMaterials}
	>
		<span>Bill of Materials</span>
		<Download class="h-4 w-4 opacity-80" />
	</button>
</div>

<!-- Units Grid -->
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each units as unit}
		<ListUnitsDashboardCard {unit} />
	{/each}
</div>
