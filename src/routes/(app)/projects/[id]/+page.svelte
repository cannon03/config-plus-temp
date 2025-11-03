<script lang="ts">
	import { page } from '$app/state';
	import { fetchUnits } from '$lib/api/unit';
	import ListUnitsDashboardCard from '$lib/components/composed/cards/ListUnitsDashboardCard.svelte';
	import type { Unit } from '$lib/types/unit';
	import { onMount } from 'svelte';
	const projectId = Number(page.params.id);
	let units = $state<Array<Unit>>();
	onMount(async () => {
		const allUnits = await fetchUnits();
		units = allUnits.filter((unit) => unit.project == projectId);
	});
</script>

<div class="flex gap-4">
	{#each units as unit}
		<ListUnitsDashboardCard {unit} />
	{/each}
</div>
