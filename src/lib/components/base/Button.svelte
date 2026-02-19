<script lang="ts">
	import { type Snippet } from 'svelte';
	import 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const variants = {
		standard: `flex w-full justify-center gap-4 rounded-lg border border-transparent bg-primary
			px-4 py-2 text-sm font-medium text-primary-foreground
			shadow-sm hover:opacity-90 focus:ring-2
			focus:ring-ring focus:ring-offset-2 focus:outline-none transition-opacity`,

		projects: `flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground 
		shadow-sm transition hover:cursor-pointer hover:opacity-90 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none`,

		white: `flex w-full justify-between rounded-lg border border-border bg-card
			px-4 py-2 text-sm font-medium text-foreground
			shadow-sm hover:bg-muted focus:ring-2
			focus:ring-ring focus:ring-offset-2 focus:outline-none transition-colors`,
		saveform: `flex justify-between gap-2 items-center rounded-lg border border-transparent bg-primary w-fit
			px-4 py-2 text-sm font-medium text-primary-foreground
			shadow-sm hover:opacity-90 focus:ring-2
			focus:ring-ring focus:ring-offset-2 focus:outline-none
			hover:cursor-pointer transition-opacity`,
		sidebar: `flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:cursor-pointer transition-colors`
	} as const;

	type Variant = keyof typeof variants;

	let { variant = 'standard', class: userClass = '', children, ...others } = $props();
</script>

<button {...others} class={`${userClass} ${variants[variant as Variant]} `}>
	{@render children()}
</button>
