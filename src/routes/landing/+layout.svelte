<script lang="ts">
	let { children } = $props();
</script>

<!-- No navbar or sidebar -->
<div class="flex min-h-screen items-center justify-center bg-gray-50">
	{@render children?.()}
</div>
