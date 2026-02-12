<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/base/Button.svelte';
	import type { Project } from '$lib/types/project';
	import {
		CalendarDays,
		Users,
		Folder,
		Link as LinkIcon,
		Info,
		Trash2,
		Pencil
	} from 'lucide-svelte';
	import Modal from '../modals/Modal.svelte';
	import CreateProjectForm from '../forms/CreateProjectForm.svelte';
	import { deleteProject } from '$lib/api/project';
	const { project, reloadProjects }: { project: Project; reloadProjects: () => void } = $props();

	const createdAtDate = new Date(project.created_at);
	const formattedCreatedAt = createdAtDate.toLocaleDateString('en-IN', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	const updatedAtDate = new Date(project.updated_at);
	const formattedUpdatedAt = updatedAtDate.toLocaleDateString('en-IN', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	let showModal = $state(false);
	let showEditModal = $state(false);

	async function handleViewProject() {
		goto(`/projects/${project.id}`);
	}

	async function del(e: Event) {
		await deleteProject(project.id);
		showModal = false;
		reloadProjects();
	}

	$effect(() => {
		if (!showEditModal) {
			reloadProjects();
		}
	});
</script>

<Modal title="Delete Project" bind:showModal>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-gray-600">Are you sure you want to delete this project?</p>
		<div class="mt-4 flex gap-3">
			<button
				class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-red-700"
				onclick={del}>Yes, Delete</button
			>
			<button
				class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
				>Cancel</button
			>
		</div>
	</div>
</Modal>

<Modal title="Edit Project" bind:showModal={showEditModal}>
	<CreateProjectForm bind:showModal={showEditModal} {project} />
</Modal>

<div
	class="flex h-[40vh] w-[20vw] flex-col justify-between rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
>
	<!-- Header -->
	<div class="border-b border-gray-100 p-6">
		<div class="flex justify-between">
			<h2 class="mb-1 truncate text-xl font-semibold text-gray-900">{project.name}</h2>
			<div class="flex gap-2">
				<button onclick={() => (showEditModal = true)}>
					<Pencil
						class="h-4 w-4 text-gray-600 opacity-80 hover:cursor-pointer hover:text-gray-900"
					/>
				</button>
				<button onclick={() => (showModal = true)}
					><Trash2
						class="h-4 w-4 text-red-600 opacity-80 hover:cursor-pointer hover:text-red-800"
					/></button
				>
			</div>
		</div>
		<p class="line-clamp-2 text-sm text-gray-600">{project.description}</p>
	</div>

	<!-- Details -->
	<div class="grow space-y-4 overflow-hidden p-6">
		<div class="flex items-center space-x-3">
			<Folder class="h-4 w-4 text-gray-500" />
			<span class="text-sm text-gray-700">
				Category: <span class="font-medium text-gray-900">Development</span>
			</span>
		</div>

		<div class="flex items-center space-x-3">
			<CalendarDays class="h-4 w-4 text-gray-500" />
			<span class="text-sm text-gray-700">
				Created on <span class="font-medium text-gray-900">{formattedCreatedAt}</span>
			</span>
		</div>

		<div class="items-cente flex space-x-3">
			<Users class="h-4 w-4 text-gray-500" />
			<span class="text-sm text-gray-700">
				Updated on: <span class="font-medium text-gray-900">{formattedUpdatedAt}</span>
			</span>
		</div>
	</div>

	<!-- Footer -->
	<div class="flex justify-end border-t border-gray-100 p-4">
		<Button variant="projects" onclick={handleViewProject}>
			<LinkIcon class="h-4 w-4" />
			<span>View Project</span>
		</Button>
	</div>
</div>
