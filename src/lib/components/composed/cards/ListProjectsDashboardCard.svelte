<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/base/Button.svelte';
	import type { Project } from '$lib/types/project';
	import { CalendarDays, Users, Folder, Link as LinkIcon, Info } from 'lucide-svelte';
	const { project }: { project: Project } = $props();

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

	async function handleViewProject() {
		goto(`/projects/${project.id}`);
	}
</script>

<div
	class="flex h-[40vh] w-[20vw] flex-col justify-between rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
>
	<!-- Header -->
	<div class="border-b border-gray-100 p-6">
		<h2 class="mb-1 truncate text-xl font-semibold text-gray-900">{project.name}</h2>
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
