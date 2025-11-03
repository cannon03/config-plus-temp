<script lang="ts">
	import LoadsView from '$lib/components/views/Loads/LoadsView.svelte';
	import { getDashboardContext } from '$lib/context/dashboard';
	import { getContext } from 'svelte';
	const ctx = getDashboardContext();
</script>

<div>
	<LoadsView />
</div>
