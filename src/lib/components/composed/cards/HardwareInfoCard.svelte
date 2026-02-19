<script lang="ts">
	const stats = $props<{
		num_rcus: number;
		num_keypads: number;
		num_loads: number;
		num_dinModules: number;
	}>();
</script>

<div class="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
	<h3 class="text-lg font-semibold text-foreground">Hardware</h3>

	<div class="space-y-3">
		{#each [['RCUs', stats.num_rcus], ['Keypads', stats.num_keypads], ['Loads', stats.num_loads], ['DIN Modules', stats.num_dinModules]] as [label, value]}
			<div class="flex justify-between text-sm">
				<span class="text-muted-foreground">{label}</span>
				<span class="font-medium text-foreground">{value}</span>
			</div>
		{/each}
	</div>
</div>
