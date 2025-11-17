<script lang="ts">
	import { fetchProjects } from '$lib/api/project';
	import ListProjectsDashboardCard from '$lib/components/composed/cards/ListProjectsDashboardCard.svelte';
	import Button from '$lib/components/base/Button.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Project } from '$lib/types/project';
	import { Download, Plus } from 'lucide-svelte';
	import Modal from '$lib/components/composed/modals/Modal.svelte';
	import CreateProjectForm from '$lib/components/composed/forms/CreateProjectForm.svelte';

	let projects = $state<Array<Project>>([]);
	let showModal = $state(false);
	let modalKey = $state(0);
	async function reloadProjects() {
		projects = await fetchProjects();
	}
	onMount(async () => {
		reloadProjects();
	});

	async function openModal(e: Event) {
		modalKey++;
		showModal = true;
	}
</script>

<Modal title="Create Project" bind:showModal onClosed={reloadProjects}>
	{#key modalKey}
		<CreateProjectForm bind:showModal />
	{/key}
</Modal>

<!-- Header bar -->
<div class="mb-6 flex items-center justify-end">
	<Button onclick={openModal} variant="projects"><Plus class="h-4 w-4"></Plus> New Project</Button>
</div>

<!-- Projects grid -->
<div class="flex flex-wrap gap-6">
	{#each projects as project}
		<ListProjectsDashboardCard {project} {reloadProjects} />
	{/each}
</div>
