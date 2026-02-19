<script lang="ts">
	import { page } from '$app/state';
	import { fetchProjectFiles } from '$lib/api/project_files';
	import ProjectFileCard from '$lib/components/composed/cards/ProjectFileCard.svelte';
	import UploadFileForm from '$lib/components/composed/forms/UploadFileForm.svelte';
	import Modal from '$lib/components/composed/modals/Modal.svelte';
	import type { ProjectFile } from '$lib/types/project_file';
	import { FolderOpen, Upload, Download, Trash2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	const projectId = Number(page.params.id);
	let showModal = $state(false);
	let files = $state<Array<ProjectFile>>([]);

	const reloadFiles = async () => {
		files = await fetchProjectFiles(projectId);
	};

	onMount(async () => {
		reloadFiles();
	});
</script>

<Modal title="Upload File" bind:showModal>
	<UploadFileForm {reloadFiles} {projectId} bind:showModal />
</Modal>

<div class="p-6">
	<!-- Header -->
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-foreground">Project Files</h1>
			<p class="mt-1 text-muted-foreground">Upload and manage your project files</p>
		</div>

		<button
			class="inline-flex items-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
			onclick={() => (showModal = true)}
		>
			<Upload class="mr-2 h-4 w-4" />
			Upload File
		</button>
	</div>

	<!-- Files Section -->
	<div class="rounded-xl border border-border bg-card p-6 shadow-sm">
		<h3 class="mb-4 text-lg font-medium text-foreground">Files (Static)</h3>

		<div class="space-y-3">
			{#each files as file}
				<ProjectFileCard {reloadFiles} {file} />
			{/each}
		</div>
	</div>
</div>
