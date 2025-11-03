<script lang="ts">
	// cards props are passed in via parent load (see note)
	import ProjectProgressCard from '$lib/components/composed/cards/ProjectProgressCard.svelte';
	import HardwareInfoCard from '$lib/components/composed/cards/HardwareInfoCard.svelte';
	import UnitActionsCard from '$lib/components/composed/cards/UnitActionsCard.svelte';
	import { page } from '$app/state';
	import { Expand, Minimize } from 'lucide-svelte';
	import { TABS } from '$lib/constants/section.js';
	import { setContext } from 'svelte';
	import { setDashboardContext } from '$lib/context/dashboard.js';
	let { children, params, data } = $props();

	// helper to compute href
	const href = (p: string) => `/units/${params.id}/dashboard${p ? '/' + p : ''}`;

	const isActive = (p: string) => {
		const current = page.url.pathname;
		const target = href(p);
		// treat default '' as dashboard root
		if (p === '')
			return (
				current === `/units/${params.id}/dashboard` || current === `/units/${params.id}/dashboard/`
			);
		return current === target;
	};

	const ctx = setDashboardContext(data);

	let expanded = $state(false);
</script>

<!-- Fixed overview/stats grid (always visible) -->
<div class="p-6">
	<div class="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
		<!-- Pass required props from the page load into these components -->
		<ProjectProgressCard
			num_scenes={data.scenes.length}
			num_rcus={data.rcus.length}
			num_keypads={data.keypads.length}
			num_rooms={data.rooms.length}
			num_zones={data.zones.length}
			num_loads={data.loads.length}
		/>

		<HardwareInfoCard
			num_rcus={data.rcus.length}
			num_keypads={data.keypads.length}
			num_loads={data.loads.length}
			num_dinModules={data.din_modules.length}
		/>

		<UnitActionsCard />
	</div>
	<script lang="ts">
		let expanded = false;
	</script>
	<div
		class={`mt-8 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300
		${expanded ? 'fixed inset-0 z-50 m-6 rounded-2xl shadow-2xl' : ''}`}
	>
		<!-- Tabs -->
		<nav class="flex items-center justify-between border-b border-gray-200 bg-white">
			<ul class="flex flex-wrap gap-1 px-4 pt-3 text-sm font-medium text-gray-600">
				{#each TABS as tab}
					{@const SectionIcon = tab.icon}
					<li>
						<a
							href={href(tab.path)}
							class="flex items-center justify-center gap-2 rounded-t-lg px-4 py-2 transition-colors duration-150
						{isActive(tab.path)
								? 'border-b-2 border-blue-600 bg-blue-50 text-blue-600'
								: 'border-b-2 border-transparent hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'}"
							aria-current={isActive(tab.path) ? 'page' : undefined}
						>
							{tab.title}
							<SectionIcon class="h-4 w-4" />
						</a>
					</li>
				{/each}
			</ul>

			<!-- Expand/Collapse Button -->
			<button
				onclick={() => (expanded = !expanded)}
				class="mr-4 ml-auto rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
			>
				{#if !expanded}
					<Expand class="h-4 w-4" />
				{:else}
					<Minimize class="h-4 w-4" />
				{/if}
			</button>
		</nav>

		<!-- Section content -->
		<div class="h-full overflow-y-auto p-6">
			{@render children?.()}
		</div>
	</div>
</div>
