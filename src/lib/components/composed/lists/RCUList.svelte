<script lang="ts">
	import { getDashboardContext } from '$lib/context/dashboard';
	import { Cpu, Plus } from 'lucide-svelte';
	import RCUCard from '$lib/components/composed/cards/RCUCard.svelte';
	import Modal from '../modals/Modal.svelte';
	import RCUForm from '../forms/RCUForm.svelte';
	import { RCU_FORM_TYPES } from '$lib/constants/rcu';

	const ctx = getDashboardContext();
	let showModal = $state(false);

	const rooms = $derived.by(() => ctx.domainGraph.layout.zones.flatMap((z) => z.rooms));

	const loads = $derived.by(() => rooms.flatMap((r) => r.loads));
</script>

<Modal bind:showModal title="Create RCU">
	<RCUForm type={RCU_FORM_TYPES.CREATE} unit={ctx.domainGraph.unit} bind:showModal />
</Modal>

<div class="space-y-6">
	<div class="rounded-lg bg-card p-4">
		<div class="mb-6 flex items-center justify-between">
			<div>
				<h3 class="text-lg font-medium text-foreground">RCU Configuration</h3>
				<p class="mt-1 text-sm text-muted-foreground">
					Configure main control units and their expansion modules
				</p>
			</div>
		</div>
		{#if ctx.domainGraph.hardware.rcus.length > 0}
			<div class="space-y-4">
				{#each ctx.domainGraph.hardware.rcus as rcu}
					<RCUCard {rcu} unit={ctx.domainGraph.unit} {loads} {rooms} />
				{/each}
			</div>
		{:else}
			<div class="py-8 text-center">
				<Cpu class="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
				<h5 class="mb-2 text-sm font-medium text-foreground">No RCUs created</h5>
				<p class="mb-4 text-sm text-muted-foreground">
					Create your first RCU to start hardware configuration
				</p>
				<button
					onclick={() => (showModal = true)}
					class="inline-flex items-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:cursor-pointer hover:opacity-90"
				>
					<Plus class="mr-2 h-4 w-4" />
					Create RCU
				</button>
			</div>
		{/if}
	</div>
</div>
