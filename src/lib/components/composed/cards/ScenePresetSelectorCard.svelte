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

<Modal bind:showModal title="Create Loads from Preset">
	<div class="space-y-4">
		<p class="text-sm text-gray-700">Do you want to create loads from the preset?</p>
		<div class="flex justify-end gap-3">
			<button
				onclick={() => {
					createPreset();
					showModal = false;
				}}
				class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
			>
				Yes
			</button>
			<button
				onclick={() => (showModal = false)}
				class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
			>
				No
			</button>
		</div>
	</div>
</Modal>

<section class="space-y-3">
	<h3 class="text-base font-semibold text-gray-900">Presets</h3>
	<p class="text-sm text-gray-600">Apply predefined levels per load type</p>
	<div class="grid grid-cols-2 gap-3">
		{#each Object.entries(SCENE_PRESETS) as [_, preset]}
			{@const Icon = preset.icon}
			<button
				onclick={() => {
					selectedPreset = preset;
					showModal = true;
				}}
				class="rounded-lg border border-gray-200 bg-gray-50 p-3 text-left shadow-sm transition hover:bg-gray-100"
			>
				<div class="mb-1 flex items-center gap-2">
					<Icon class="h-5 w-5 text-yellow-600" />
					<span class="text-sm font-semibold text-gray-900">{preset.name}</span>
				</div>
				<p class="text-xs text-gray-500">{preset.description}</p>
			</button>
		{/each}
	</div>
</section>
