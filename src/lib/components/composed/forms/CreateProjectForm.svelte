<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';

	import type { ProjectRequest, Project } from '$lib/types/project';
	import { createProject, updateProject } from '$lib/api/project';

	let { showModal = $bindable(false), project }: { showModal?: boolean; project?: Project } =
		$props();

	let projectRequest = $state<ProjectRequest>({
		name: project ? project.name : '',
		description: project ? project.description : ''
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (project) {
			await updateProject(project.id, projectRequest);
		} else {
			await createProject(projectRequest);
		}
		showModal = false;
	}
</script>

<form class="space-y-4 p-4" onsubmit={handleSubmit}>
	<div class="flex flex-col space-y-1">
		<label class="text-sm font-medium text-foreground" for="unit-name">Name</label>
		<input
			id="unit-name"
			name="unit-name"
			type="text"
			bind:value={projectRequest.name}
			class="rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none"
		/>
	</div>

	<div class="flex flex-col space-y-1">
		<label class="text-sm font-medium text-foreground" for="unit-description">Description</label>
		<textarea
			id="unit-description"
			name="unit-description"
			bind:value={projectRequest.description}
			class="h-28 resize-none rounded-lg border border-border bg-background px-3 py-2 text-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none"
		></textarea>
	</div>

	<div class="pt-2">
		<Button type="submit" class="w-full">{project ? 'Update Project' : 'Create Project'}</Button>
	</div>
</form>
