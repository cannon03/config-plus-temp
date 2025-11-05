<script lang="ts">
	import { Settings } from 'lucide-svelte';
	import DinModuleCard from '$lib/components/composed/cards/DinModuleCard.svelte';

	const { modules, channels, loads } = $props();
</script>

{#if modules.length > 0}
	<div class="space-y-3">
		{#each modules as module}
			<DinModuleCard {module} {channels} {loads} />
		{/each}
	</div>
{:else}
	<div class="py-4 text-center text-gray-500">
		<Settings class="mx-auto mb-2 h-8 w-8 text-gray-300" />
		<p class="text-sm">No DIN modules in this RCU</p>
		<button class="mt-2 text-xs text-blue-600 hover:text-blue-800">Add first module</button>
	</div>
{/if}
