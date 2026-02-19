<script lang="ts">
	const stats = $props<{
		num_zones: number;
		num_rooms: number;
		num_loads: number;
		num_scenes: number;
		num_keypads: number;
		num_rcus: number;
	}>();

	const completionSteps = $derived(
		[
			stats.num_zones,
			stats.num_rooms,
			stats.num_loads,
			stats.num_scenes,
			stats.num_keypads,
			stats.num_rcus
		].filter((n) => n > 0).length
	);

	const completionPercentage = $derived(Math.floor((completionSteps / 6) * 100));
</script>

<div class="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
	<h3 class="text-lg font-semibold text-foreground">Project Progress</h3>

	<div>
		<div class="mb-2 flex justify-between text-sm">
			<span class="text-muted-foreground">Overall Completion</span>
			<span class="font-medium text-foreground">{completionPercentage}%</span>
		</div>
		<div class="h-2 w-full overflow-hidden rounded-full bg-muted">
			<div
				class="h-2 rounded-full bg-primary transition-all duration-300"
				style="width: {completionPercentage}%"
			></div>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4 text-center">
		{#each [['Zones', stats.num_zones], ['Rooms', stats.num_rooms], ['Loads', stats.num_loads], ['Scenes', stats.num_scenes]] as [label, value]}
			<div>
				<p class="text-2xl font-bold text-foreground">{value || 0}</p>
				<p class="text-sm text-muted-foreground">{label}</p>
			</div>
		{/each}
	</div>
</div>
