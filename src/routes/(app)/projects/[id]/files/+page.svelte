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
			<h1 class="text-2xl font-bold text-gray-900">Project Files</h1>
			<p class="mt-1 text-gray-600">Upload and manage your project files</p>
		</div>

		<button
			class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
			onclick={() => (showModal = true)}
		>
			<Upload class="mr-2 h-4 w-4" />
			Upload File
		</button>
	</div>

	<!-- Files Section -->
	<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
		<h3 class="mb-4 text-lg font-medium text-gray-900">Files (Static)</h3>

		<!-- Example file list -->
		<div class="space-y-3">
			<!-- File Row -->
			{#each files as file}
				<ProjectFileCard {reloadFiles} {file} />
			{/each}
		</div>
	</div>
</div>
