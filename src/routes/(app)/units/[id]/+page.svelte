<script lang="ts">
	import ProjectProgressCard from '$lib/components/composed/cards/ProjectProgressCard.svelte';
	import HardwareInfoCard from '$lib/components/composed/cards/HardwareInfoCard.svelte';
	import UnitActionsCard from '$lib/components/composed/cards/UnitActionsCard.svelte';
	import { getDashboardContext } from '$lib/context/dashboard';
</script>

<!-- Clean, responsive 3-column layout -->
<div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">All Units</div>
