<script lang="ts">
	const variants = {
		standard: `block w-full appearance-none rounded-md border border-gray-300 px-3 py-2
			placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500
			focus:outline-none sm:text-sm`,
		outline: `block w-full appearance-none rounded-md border border-blue-500 px-3 py-2
			placeholder-gray-400 focus:border-blue-600 focus:ring-blue-600
			focus:outline-none sm:text-sm`
	} as const;

	type Variant = keyof typeof variants;

	let { variant = 'standard', ...others } = $props();
</script>

<input {...others} class={variants[variant as Variant]} />
