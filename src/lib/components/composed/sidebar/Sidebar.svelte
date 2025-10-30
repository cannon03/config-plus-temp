<script lang="ts">
	import {
		X,
		Menu,
		Home,
		Grid,
		HelpCircle,
		LogOut,
		Bell,
		TreePine,
		ArrowRightCircleIcon,
		ArrowRightFromLine
	} from 'lucide-svelte';

	// Controlled by parent layout
	let sidebarOpen = $state(true);
	async function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
</script>

{#if sidebarOpen}
	<aside class="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white shadow-sm">
		<!-- Header / Toggle -->
		<div class="flex items-center justify-between border-b border-gray-200 p-4">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
				<TreePine class="h-5 w-5 text-white" />
			</div>

			<h2 class="text-lg font-semibold text-gray-800">Toyama RCU</h2>
			<button
				class="rounded-md p-2 hover:bg-gray-100 focus:outline-none"
				onclick={toggleSidebar}
				aria-label="Close sidebar"
			>
				<X class="h-5 w-5 text-gray-700" />
			</button>
		</div>

		<!-- Main Navigation -->
		<div class="flex-1 p-4">
			<nav class="space-y-2">
				<button
					class="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					<Home class="h-5 w-5" />
					<span>Dashboard</span>
				</button>

				<div class="border-t border-gray-200 pt-4">
					<h3 class="mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
						Project: Example
					</h3>

					<button
						class="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						<Grid class="h-5 w-5" />
						<span>Project Setup</span>
					</button>
				</div>
			</nav>
		</div>

		<!-- Bottom Actions -->
		<div class="border-t border-gray-200 p-4">
			<div class="space-y-2">
				<button
					class="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					<HelpCircle class="h-5 w-5" />
					<span>Help & Guide</span>
				</button>

				<button
					class="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					<LogOut class="h-5 w-5" />
					<span>Logout</span>
				</button>
			</div>
		</div>
	</aside>
{:else}
	<!-- Collapsed state: small icon-only button -->
	<button
		class="m-2 rounded-md p-2 hover:bg-gray-100 focus:outline-none"
		onclick={toggleSidebar}
		aria-label="Open sidebar"
	>
		<ArrowRightFromLine class="h-5 w-5 text-gray-700" />
	</button>
{/if}
