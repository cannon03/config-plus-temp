<script lang="ts">
	import { LOAD_TYPES } from '$lib/constants/load';
	import type { SceneLoadData } from '$lib/types/scene_load';
	import {
		Expand,
		ListCollapse,
		Trash2,
		Zap,
		ZapOff,
		ArrowUp,
		ArrowDown,
		Square,
		Power,
		Lightbulb,
		Sun
	} from 'lucide-svelte';

	let {
		sceneLoads = $bindable([])
	}: {
		sceneLoads: Array<SceneLoadData>;
	} = $props();

	function clearSceneLoads() {
		sceneLoads = [];
	}

	function deleteSceneLoad(id: number) {
		sceneLoads = sceneLoads.filter((load) => load.load_id !== id);
	}
</script>

<div class="flex h-full flex-col">
	<section class="flex-none border-b border-border bg-muted/50 px-4 py-3">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="text-sm font-semibold text-foreground">Configured Loads</h3>
				<p class="mt-0.5 text-xs text-muted-foreground">{sceneLoads.length} loads in this scene</p>
			</div>

			{#if sceneLoads.length > 0}
				<button
					onclick={clearSceneLoads}
					class="group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
					title="Remove all loads"
				>
					<Trash2 class="h-3.5 w-3.5" />
					<span>Clear All</span>
				</button>
			{/if}
		</div>
	</section>

	<div class="min-h-0 flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
		{#if sceneLoads.length === 0}
			<div
				class="flex h-full flex-col items-center justify-center py-12 text-center text-muted-foreground"
			>
				<ZapOff class="mb-3 h-10 w-10 text-muted-foreground/40" />
				<p class="text-sm font-medium text-foreground">No loads configured</p>
				<p class="mt-1 max-w-[200px] text-xs">
					Add loads from the left panel or select a preset to get started.
				</p>
			</div>
		{:else}
			{#each sceneLoads as load (load.load_id)}
				{@const loadData = LOAD_TYPES[load.load_type]}
				{@const LoadIcon = loadData.icon}
				<div
					class="group relative flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:border-border hover:shadow-md"
				>
					<!-- Icon & Info -->
					<div class="min-w-0 flex-1">
						<div class="mb-4 flex items-center gap-3">
							<div
								class="flex-shrink-0 rounded-lg bg-muted p-2 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
							>
								<LoadIcon class="h-5 w-5" />
							</div>
							<div class="min-w-0">
								<p class="truncate text-sm font-semibold text-foreground">{load.name}</p>
								<p class="truncate text-xs text-muted-foreground">{loadData.label}</p>
							</div>
						</div>

						<!-- Controls based on Load Type -->
						{#if ['phase_cut', '1-10v', 'dali-dt6', 'dali-dt8'].includes(load.load_type)}
							<!-- Dimmer Control (Percentage) -->
							<div class="flex items-center gap-3">
								<div class="relative flex-1">
									<input
										type="range"
										min="0"
										max="100"
										bind:value={load.value}
										class="h-2 w-full cursor-pointer rounded-full accent-primary focus:ring-0 focus:outline-none"
									/>
								</div>
								<div
									class="w-14 rounded-md bg-primary/20 py-1.5 text-center font-mono text-sm font-bold text-primary shadow-[0_0_10px_rgba(var(--primary),0.3)] ring-1 ring-primary"
								>
									{load.value}%
								</div>
							</div>
						{:else if load.load_type === 'curtain'}
							<!-- Curtain Control (Open/Stop/Close) -->
							<div class="flex items-stretch justify-between gap-2 rounded-lg bg-muted p-1">
								<button
									onclick={() => (load.value = 1)}
									class="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all {load.value ===
									1
										? 'bg-card text-primary shadow-sm ring-1 ring-border'
										: 'text-muted-foreground hover:bg-card/50 hover:text-foreground'}"
								>
									<ArrowUp class="h-3.5 w-3.5" />
									Open
								</button>
								<button
									onclick={() => (load.value = 0)}
									class="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all {load.value ===
									0
										? 'bg-card text-red-600 shadow-sm ring-1 ring-border'
										: 'text-muted-foreground hover:bg-card/50 hover:text-foreground'}"
								>
									<Square class="h-3 w-3" />
									Stop
								</button>
								<button
									onclick={() => (load.value = -1)}
									class="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all {load.value ===
									-1
										? 'bg-card text-primary shadow-sm ring-1 ring-border'
										: 'text-muted-foreground hover:bg-card/50 hover:text-foreground'}"
								>
									<ArrowDown class="h-3.5 w-3.5" />
									Close
								</button>
							</div>
						{:else if load.load_type === 'relay'}
							<!-- Relay Control (On/Off) -->
							<div class="flex items-center justify-between gap-3">
								<span class="text-xs font-medium text-muted-foreground">Power State</span>
								<button
									onclick={() => (load.value = load.value ? 0 : 1)}
									class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none {load.value
										? 'bg-primary'
										: 'bg-muted'}"
								>
									<span class="sr-only">Use setting</span>
									<span
										aria-hidden="true"
										class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {load.value
											? 'translate-x-5'
											: 'translate-x-0'}"
									></span>
								</button>
							</div>
						{/if}
					</div>

					<!-- Delete Action -->
					<button
						onclick={() => deleteSceneLoad(load.load_id)}
						class="absolute top-2 right-2 rounded-full p-1.5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 focus:opacity-100"
						title="Remove load"
					>
						<Trash2 class="h-4 w-4" />
					</button>
				</div>
			{/each}
		{/if}
	</div>
</div>
