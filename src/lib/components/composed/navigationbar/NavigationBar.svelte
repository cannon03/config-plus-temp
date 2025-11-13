<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { fetchProjects } from '$lib/api/project';
	import type { Project } from '$lib/types/project';
	import type { Unit } from '$lib/types/unit';
	import { TreePine, ChevronRight } from 'lucide-svelte';
	import { fetchUnits } from '$lib/api/unit';

	const pathName = $derived(page.route.id);

	const isUnits = $derived.by(() => pathName?.startsWith('/(app)/units/[id]'));
	const isProjects = $derived.by(() => pathName?.startsWith('/(app)/projects/[id]'));

	let thisProject: Project | undefined = $state();
	let thisUnit: Unit | undefined = $state();

	async function setProjectThroughParams() {
		const allProjects = await fetchProjects();
		thisProject = allProjects.find((project) => project.id === Number(page.params.id));
	}

	async function setProjectThroughUnit() {
		const allProjects = await fetchProjects();
		thisProject = allProjects.find((project) => project.id === thisUnit!.project);
	}

	async function setUnit() {
		const allUnits = await fetchUnits();
		thisUnit = allUnits.find((unit) => unit.id === Number(page.params.id));
	}

	$effect(() => {
		console.log('PAGE', $state.snapshot(page));
		if (isProjects) {
			setProjectThroughParams();
		}
		if (isUnits) {
			setUnit();
			setProjectThroughUnit();
		}
	});
</script>

<nav class="border-b border-gray-200 bg-white shadow-sm">
	<div class="mx-auto w-full px-6">
		<div class="grid h-16 w-full grid-cols-3 items-center">
			<!-- Brand (Left) -->
			<div class="flex items-center space-x-3">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
					<TreePine class="h-5 w-5 text-white" />
				</div>
				<div>
					<h1 class="text-xl font-semibold text-gray-900">Toyama RCU</h1>
					<p class="text-sm text-gray-500">Configuration Tool</p>
				</div>
			</div>

			<!-- Breadcrumb (Center) -->
			<div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
				<button
					onclick={() => goto('/projects')}
					class="cursor-pointer hover:text-gray-700 hover:underline">Dashboard</button
				>
				{#if (isProjects && thisProject) || (isUnits && thisProject)}
					{@const projectId = thisProject.id}
					<ChevronRight class="h-4 w-4" />
					<button
						class="cursor-pointer hover:text-gray-700 hover:underline"
						onclick={() => goto(`/projects/${projectId}`)}>{thisProject.name}</button
					>
				{/if}

				{#if isUnits && thisUnit}
					{@const unitId = thisUnit.id}
					<ChevronRight class="h-4 w-4" />
					<button
						class="cursor-pointer hover:text-gray-700 hover:underline"
						onclick={() => goto(`/units/${unitId}/dashboard`)}>{thisUnit.name}</button
					>
				{/if}
			</div>

			<!-- Empty Right (for balance or future items like profile/settings) -->
			<div></div>
		</div>
	</div>
</nav>
