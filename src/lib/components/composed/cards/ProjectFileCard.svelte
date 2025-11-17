<script lang="ts">
	import { Download, FolderOpen, Trash2 } from 'lucide-svelte';
	import type { ProjectFile } from '$lib/types/project_file';
	import Modal from '../modals/Modal.svelte';
	import { deleteFile, getDownloadURL } from '$lib/api/project_files';
	import { downloadProjectFile } from '$lib/utils/download';
	const { file, reloadFiles }: { file: ProjectFile; reloadFiles: () => void } = $props();
	let showModal = $state(false);
	async function del() {
		await deleteFile(file.id);
		showModal = false;
		reloadFiles();
	}

	async function download() {
		downloadProjectFile(file.id);
	}
</script>

<Modal title="Delete File" bind:showModal>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-gray-600">Are you sure you want to delete this file?</p>
		<div class="mt-4 flex gap-3">
			<button
				class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-red-700"
				onclick={del}>Yes, Delete</button
			>
			<button
				class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
				onclick={() => (showModal = false)}>Cancel</button
			>
		</div>
	</div>
</Modal>

<div class="flex items-center justify-between rounded-lg bg-gray-50 p-3">
	<div class="flex items-center space-x-3">
		<FolderOpen class="h-5 w-5 text-gray-400" />
		<div>
			<button onclick={download} class="cursor-pointer text-sm font-medium text-blue-600 underline">
				{file.filename}
			</button>
			<p class="text-xs text-gray-500">{file.size}</p>
		</div>
	</div>

	<div class="flex items-center gap-3">
		<button
			class="rounded px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-800"
			onclick={download}
		>
			<Download class="mr-1 inline-block h-4 w-4" />
			Download
		</button>

		<button
			class="rounded px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-800"
			onclick={() => (showModal = true)}
		>
			<Trash2 class="mr-1 inline-block h-4 w-4" />
			Delete
		</button>
	</div>
</div>
