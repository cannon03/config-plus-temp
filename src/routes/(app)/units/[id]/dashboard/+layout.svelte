<script lang="ts">
	// cards props are passed in via parent load (see note)
	import ProjectProgressCard from '$lib/components/composed/cards/ProjectProgressCard.svelte';
	import HardwareInfoCard from '$lib/components/composed/cards/HardwareInfoCard.svelte';
	import UnitActionsCard from '$lib/components/composed/cards/UnitActionsCard.svelte';
	import { page } from '$app/state';
	import { Expand, Minimize } from 'lucide-svelte';
	import { RELOAD_TARGETS, TABS } from '$lib/constants/dashboard.js';
	import { setContext } from 'svelte';
	import { setDashboardContext } from '$lib/context/dashboard.js';
	import { fetchUnit } from '$lib/api/unit';
	import { fetchScenes } from '$lib/api/scene';
	import { fetchRCUs } from '$lib/api/rcu';
	import { fetchKeypads } from '$lib/api/keypad';
	import { fetchLoads } from '$lib/api/load';
	import { fetchRooms } from '$lib/api/room';
	import { fetchZones } from '$lib/api/zone';
	import { fetchDinModules } from '$lib/api/din_module';
	import { fetchChannels } from '$lib/api/channel';
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

	const ctx = $state(data);
	setDashboardContext(ctx);

	async function refetchLoads() {
		const all = await fetchLoads();
		ctx.loads = all.filter((l) => ctx.rooms.some((r) => r.id === l.room));
	}

	async function refetchRooms() {
		const all = await fetchRooms();
		ctx.rooms = all.filter((r) => ctx.zones.some((z) => z.id === r.zone));
	}

	async function refetchZones() {
		const all = await fetchZones();
		ctx.zones = all.filter((z) => z.unit === ctx.unit.id);
	}

	async function refetchKeypads() {
		const all = await fetchKeypads();
		ctx.keypads = all.filter((k) => ctx.rooms.some((r) => k.location_room === r.id));
	}

	async function refetchChannels() {
		const all = await fetchChannels();
		ctx.channels = all.filter((channel) => ctx.loads.some((l) => l.id == channel.load));
		console.log($state.snapshot(ctx.channels));
	}

	async function reload(type: string) {
		switch (type) {
			case RELOAD_TARGETS.LOADS: {
				await refetchLoads();
				break;
			}
			case RELOAD_TARGETS.ROOMS: {
				await refetchRooms();
				await refetchLoads();
				await refetchKeypads();
				break;
			}
			case RELOAD_TARGETS.SCENES: {
				const all = await fetchScenes();
				ctx.scenes = all.filter((s) => s.unit === ctx.unit.id);
				break;
			}
			case RELOAD_TARGETS.RCUS: {
				const all = await fetchRCUs();
				ctx.rcus = all.filter((r) => r.unit === ctx.unit.id);
				break;
			}
			case RELOAD_TARGETS.ZONES: {
				console.log('REFETCHING ZONES');
				await refetchZones();
				await refetchRooms();
				await refetchLoads();
				await refetchKeypads();
				break;
			}
			case RELOAD_TARGETS.KEYPADS: {
				await refetchKeypads();
				break;
			}
			case RELOAD_TARGETS.DIN_MODULES: {
				const all = await fetchDinModules();
				ctx.dinModules = all.filter((d) => ctx.rcus.some((r) => d.rcu === r.id));
				break;
			}
			case RELOAD_TARGETS.CHANNELS: {
				refetchChannels();
				break;
			}
		}
	}

	$effect(() => {
		function handler(e: Event) {
			console.log('EVENT', e.type);
			reload(e.type);
		}

		const targets = Object.values(RELOAD_TARGETS);

		for (const event of targets) window.addEventListener(event, handler);

		return () => {
			for (const event of targets) window.removeEventListener(event, handler);
		};
	});

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
			num_dinModules={data.dinModules.length}
		/>

		<UnitActionsCard />
	</div>
	<div
		class={`mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300
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
