<script lang="ts">
	import ProjectProgressCard from '$lib/components/composed/cards/ProjectProgressCard.svelte';
	import HardwareInfoCard from '$lib/components/composed/cards/HardwareInfoCard.svelte';
	import UnitActionsCard from '$lib/components/composed/cards/UnitActionsCard.svelte';

	let { data } = $props();

	const { unit, scenes, rcus, keypads, loads, zones, rooms, din_modules } = data;
</script>

<!-- Clean, responsive 3-column layout -->
<div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
	<ProjectProgressCard
		num_scenes={scenes.length}
		num_rcus={rcus.length}
		num_keypads={keypads.length}
		num_rooms={rooms.length}
		num_zones={zones.length}
		num_loads={loads.length}
	/>

	<HardwareInfoCard
		num_rcus={rcus.length}
		num_keypads={keypads.length}
		num_loads={loads.length}
		num_dinModules={din_modules.length}
	/>

	<UnitActionsCard />
</div>
