<script lang="ts">
	import { page } from '$app/state';
	import { fetchProjects } from '$lib/api/project';
	import Button from '$lib/components/base/Button.svelte';
	import { fetchUnits } from '$lib/api/unit';

	import {
		LayoutDashboard,
		MonitorSmartphone,
		Layers,
		Settings,
		LogOut,
		ChevronLeft,
		ChevronRight,
		CircleQuestionMark
	} from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { signOut } from '$lib/utils/auth';
	import type { Project } from '$lib/types/project';

	let sidebarOpen = $state(true);
	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	const pathName = $derived(page.route.id);

	const isUnits = $derived.by(() => pathName?.startsWith('/(app)/units'));
	const isProjects = $derived.by(() => pathName?.startsWith('/(app)/projects'));
	const atFiles = $derived.by(() => pathName?.startsWith('/(app)/projects/[id]/files'));

	async function navigateToProjectUnits() {
		const pageId = Number(page.params.id);
		let projectId = undefined;

		if (isUnits) {
			const units = await fetchUnits();
			const thisUnit = units.find((unit) => unit.id == pageId);
			const projects = await fetchProjects();
			const project = projects.find((project) => project.id == thisUnit!.project);
			projectId = project?.id;
		} else if (atFiles) {
			projectId = pageId;
		}

		if (projectId) {
			goto(`/projects/${projectId}`);
		}
	}
	async function logOut() {
		signOut();
		await goto('/');
	}

	async function navigateToAllProjects() {
		await goto('/projects');
	}
</script>

{#if sidebarOpen}
	<aside
		class="relative flex w-64 flex-col border-r border-border bg-card shadow-sm transition-all duration-300"
	>
		<div class="absolute top-1/2 -right-4 -translate-y-1/2">
			<button
				onclick={toggleSidebar}
				class="flex items-center justify-center rounded-full border border-border bg-card p-2 shadow-sm transition-all duration-200 hover:bg-muted"
				aria-label="Collapse sidebar"
			>
				<ChevronLeft class="h-5 w-5 text-foreground" />
			</button>
		</div>
		<!-- Navigation -->
		<nav class="flex flex-1 flex-col justify-start space-y-1 p-4">
			{#if isUnits}
				<Button variant="sidebar" onclick={navigateToProjectUnits}>
					<LayoutDashboard class="h-5 w-5" />
					<span>Units</span>
				</Button>
			{:else if isProjects}
				<Button variant="sidebar" onclick={navigateToAllProjects}>
					<LayoutDashboard class="h-5 w-5" />
					<span>Projects</span>
				</Button>
				<button
					class="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
				>
					<MonitorSmartphone class="h-5 w-5" />
					<span>Devices</span>
				</button>

				{#if atFiles}
					<Button variant="sidebar" onclick={navigateToProjectUnits}>
						<LayoutDashboard class="h-5 w-5" />
						<span>Dashboard</span></Button
					>
				{/if}
			{/if}
		</nav>

		<!-- Footer -->
		<div class="space-y-1 border-t border-border p-4">
			<button
				class="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
			>
				<CircleQuestionMark class="h-5 w-5" />
				<span>Help & Guide</span>
			</button>
			<button
				class="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
				onclick={logOut}
			>
				<LogOut class="h-5 w-5" />
				<span>Logout</span>
			</button>
		</div>
	</aside>
{:else}
	<!-- Collapsed Sidebar Toggle -->
	<button
		class="fixed top-1/2 left-2 -translate-y-1/2 rounded-full border border-border bg-card p-2 shadow-sm transition-all duration-200 hover:bg-muted"
		onclick={toggleSidebar}
		aria-label="Open sidebar"
	>
		<ChevronRight class="h-5 w-5 text-foreground" />
	</button>
{/if}
