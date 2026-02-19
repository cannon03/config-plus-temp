<!-- +layout.svelte -->
<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import NavigationBar from '$lib/components/composed/navigationbar/NavigationBar.svelte';
	import Sidebar from '$lib/components/composed/sidebar/Sidebar.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Full-page flex container -->
<div class="flex h-screen flex-col bg-background">
	<!-- Fixed-height navigation bar -->
	<NavigationBar />

	<!-- Flexible main area (sidebar + page) -->
	<div class="flex flex-1 overflow-hidden">
		<!-- Sidebar takes full height of remaining space -->
		<Sidebar />

		<!-- Scrollable page content -->
		<main class="flex-1 overflow-y-auto p-6">
			{@render children()}
		</main>
	</div>
</div>
