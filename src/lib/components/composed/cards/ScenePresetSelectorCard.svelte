<script lang="ts">
	import { SCENE_PRESETS } from '$lib/constants/scene';
	import type { ScenePreset } from '$lib/types/scene';
	import Modal from '../modals/Modal.svelte';
	let {
		selectedPreset = $bindable(),
		createPreset
	}: {
		selectedPreset: ScenePreset;
		createPreset: () => void;
	} = $props();

	let showModal = $state(false);
</script>

<Modal bind:showModal title="Apply Preset">
	<div class="mt-2">
		<p class="text-sm text-muted-foreground">
			This will set all loads in the current scene to the predefined values for <strong
				>{selectedPreset?.name}</strong
			>. Existing values will be overwritten.
		</p>
	</div>

	<div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
		<button
			type="button"
			class="inline-flex w-full justify-center rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:col-start-2"
			onclick={() => {
				createPreset();
				showModal = false;
			}}
		>
			Apply Preset
		</button>
		<button
			type="button"
			class="mt-3 inline-flex w-full justify-center rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted sm:col-start-1 sm:mt-0"
			onclick={() => (showModal = false)}
		>
			Cancel
		</button>
	</div>
</Modal>

<section class="space-y-3">
	<div class="flex items-center justify-between">
		<h3 class="text-sm font-semibold text-foreground">Quick Presets</h3>
	</div>

	<div class="grid grid-cols-2 gap-3">
		{#each Object.entries(SCENE_PRESETS) as [_, preset]}
			{@const Icon = preset.icon}
			<button
				onclick={() => {
					selectedPreset = preset;
					showModal = true;
				}}
				class="group relative flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:outline-none"
			>
				<Icon class="h-4 w-4 text-muted-foreground group-hover:text-primary" />
				<span>{preset.name}</span>
			</button>
		{/each}
	</div>
</section>
