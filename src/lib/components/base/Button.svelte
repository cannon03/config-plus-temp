<script lang="ts">
	import { type Snippet } from 'svelte';
	import 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const variants = {
		standard: `flex w-full justify-between rounded-md border border-transparent bg-blue-600
			px-4 py-2 text-sm font-medium text-white
			shadow-sm hover:bg-blue-700 focus:ring-2
			focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`,

		projects: `flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white 
		shadow-sm transition hover:cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`,

		white: `flex w-full justify-between rounded-md border border-transparent bg-white-600
			px-4 py-2 text-sm font-medium text-black
			shadow-sm hover:bg-white-700 focus:ring-2
			focus:ring-gray-500 focus:ring-offset-2 focus:outline-none`,
		loadform: `flex justify-between items-center rounded-md border border-transparent bg-blue-600 w-1/4
			px-4 py-2 text-sm font-medium text-white
			shadow-sm hover:bg-blue-700 focus:ring-2
			focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`
	} as const;

	type Variant = keyof typeof variants;

	let { variant = 'standard', class: userClass = '', children, ...others } = $props();
</script>

<button {...others} class={`${userClass} ${variants[variant as Variant]} `}>
	{@render children()}
</button>
