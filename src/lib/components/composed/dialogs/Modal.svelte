<script>
	import { X } from 'lucide-svelte';

	let { showModal = $bindable(), title, children } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
		else dialog.close();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	class="m-auto rounded-lg bg-white p-6 shadow-lg"
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div class="flex flex-col gap-4">
		<h2 class="flex justify-between">
			{title}
			<button class="hover:cursor-pointer" onclick={() => dialog.close()}
				><X class="h-5 w-5" /></button
			>
		</h2>
		{@render children?.()}
	</div>
</dialog>
