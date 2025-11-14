<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { getAccessToken } from '$lib/utils/storage';
	import { goto } from '$app/navigation';
	let { children } = $props();

	const accessToken = $derived.by(() => getAccessToken());

	$effect(() => {
		if (!accessToken || accessToken === '') {
			goto('/');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
