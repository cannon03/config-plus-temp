<script lang="ts">
	import { fetchProjects } from '$lib/api/project';
	import ListProjectsDashboardCard from '$lib/components/composed/cards/ListProjectsDashboardCard.svelte';
	import Button from '$lib/components/base/Button.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Project } from '$lib/types/project';
	import { Plus } from 'lucide-svelte';

	let projects = $state<Array<Project>>([]);

	onMount(async () => {
		projects = await fetchProjects();
	});

	function handleNewProject() {
		goto('/projects/new'); // or wherever your create form is
	}
</script>

<!-- Header bar -->
<div class="mb-6 flex items-center justify-end">
	<Button variant="projects" onclick={handleNewProject}
		><Plus class="h-4 w-4"></Plus> New Project</Button
	>
</div>

<!-- Projects grid -->
<div class="flex flex-wrap gap-6">
	{#each projects as project}
		<ListProjectsDashboardCard {project} />
	{/each}
</div>
