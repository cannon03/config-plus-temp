<script lang="ts">
	import { KEY_EVENT_TYPES } from '$lib/constants/key_action';
	import type { KEY_ACTIONE_TYPE_VALUE } from '$lib/types/key_action';

	let {
		selectedKeyAction = $bindable()
	}: {
		selectedKeyAction: KEY_ACTIONE_TYPE_VALUE;
	} = $props();
</script>

<section class="space-y-3">
	<h3 class="text-base font-semibold text-gray-900">Keypad State</h3>
	<p class="text-sm text-gray-600">Select keypad state that triggers this scene</p>
	<div class="flex gap-3">
		{#each Object.entries(KEY_EVENT_TYPES) as [_, action]}
			<button
				class={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition
								${
									action.value === selectedKeyAction
										? 'bg-blue-600 text-white hover:bg-blue-700'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
				onclick={() => (selectedKeyAction = action.value)}
			>
				{action.label}
			</button>
		{/each}
	</div>
</section>
