<script lang="ts">
	const variants = {
		standard: `block w-full appearance-none rounded-lg border border-border bg-card px-3 py-2
			placeholder-muted-foreground text-foreground focus:border-primary focus:ring-primary
			focus:outline-none sm:text-sm transition-colors`,
		outline: `block w-full appearance-none rounded-lg border border-primary bg-card px-3 py-2
			placeholder-muted-foreground text-foreground focus:border-primary focus:ring-primary
			focus:outline-none sm:text-sm transition-colors`
	} as const;

	type Variant = keyof typeof variants;

	let { variant = 'standard', ...others } = $props();
</script>

<input {...others} class={variants[variant as Variant]} />
