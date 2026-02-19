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
	<h3 class="text-base font-semibold text-foreground">Keypad State</h3>
	<p class="text-sm text-muted-foreground">Select keypad state that triggers this scene</p>
	<div class="flex gap-3">
		{#each Object.entries(KEY_EVENT_TYPES) as [_, action]}
			<button
				class={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition
								${
									action.value === selectedKeyAction
										? 'bg-primary text-primary-foreground hover:opacity-90'
										: 'bg-muted text-foreground hover:bg-muted/80'
								}`}
				onclick={() => (selectedKeyAction = action.value)}
			>
				{action.label}
			</button>
		{/each}
	</div>
</section>
