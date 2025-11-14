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

	let sidebarOpen = $state(true);
	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
	console.log('PAGE', $state.snapshot(page.url.pathname));

	const pathName = $derived(page.url.pathname);

	const isUnits = $derived.by(() => pathName.startsWith('/units'));
	const isProjects = $derived.by(() => pathName.startsWith('/projects'));

	async function navigateToProjectUnits() {
		const UnitId = Number(page.params.id);
		const units = await fetchUnits();
		const thisUnit = units.find((unit) => unit.id == UnitId);
		const projects = await fetchProjects();
		const project = projects.find((project) => project.id == thisUnit?.project);

		if (project) {
			goto(`/projects/${project.id}`);
		}
	}
	async function logOut() {
		signOut();
		goto('/');
	}

	async function navigateToAllProjects() {
		goto('/projects');
	}
</script>

{#if sidebarOpen}
	<aside
		class="relative flex w-64 flex-col border-r border-gray-200 bg-white shadow-sm transition-all duration-300"
	>
		<div class="absolute top-1/2 -right-4 -translate-y-1/2">
			<button
				onclick={toggleSidebar}
				class="flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 hover:bg-gray-100"
				aria-label="Collapse sidebar"
			>
				<ChevronLeft class="h-5 w-5 text-gray-700" />
			</button>
		</div>
		<!-- Navigation -->
		<nav class="flex flex-1 flex-col justify-start space-y-2 p-4">
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
					class="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					<MonitorSmartphone class="h-5 w-5" />
					<span>Devices</span>
				</button>
			{/if}
		</nav>

		<!-- Collapse Button (vertically centered, reactive) -->

		<!-- Footer -->
		<div class="space-y-2 border-t border-gray-200 p-4">
			<button
				class="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
			>
				<CircleQuestionMark class="h-5 w-5" />
				<span>Help & Guide</span>
			</button>
			<button
				class="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
		class="fixed top-1/2 left-2 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 hover:bg-gray-100"
		onclick={toggleSidebar}
		aria-label="Open sidebar"
	>
		<ChevronRight class="h-5 w-5 text-gray-700" />
	</button>
{/if}
