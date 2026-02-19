<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	import { fetchUnits } from '$lib/api/unit';
	import ListUnitsDashboardCard from '$lib/components/composed/cards/ListUnitsDashboardCard.svelte';

	import type { Unit } from '$lib/types/unit';
	import { Download, Folder, Plus } from 'lucide-svelte';
	import { downloadBillOfMaterials } from '$lib/utils/download';
	import Modal from '$lib/components/composed/modals/Modal.svelte';
	import CreateUnitForm from '$lib/components/composed/forms/CreateUnitForm.svelte';
	import { goto } from '$app/navigation';

	const projectId = Number(page.params.id);
	let units = $state<Array<Unit>>([]);

	let showModal = $state(false);
	let showModalKey = $state(0);

	onMount(async () => {
		reloadUnits();
	});

	async function reloadUnits() {
		const allUnits = await fetchUnits();
		units = allUnits.filter((u) => u.project === projectId);
	}

	async function getBillOfMaterials() {
		downloadBillOfMaterials(projectId, 'BOM');
	}

	function openCreateUnitModal() {
		showModalKey++;
		showModal = true;
	}
</script>

<Modal onClosed={async () => await reloadUnits()} title="Create Unit" bind:showModal>
	{#key showModalKey}
		<CreateUnitForm {projectId} bind:showModal />
	{/key}
</Modal>

<!-- Header + Button Row -->
<div class="mb-4 flex items-center justify-end gap-2">
	<h2 class="flex-1 text-lg font-semibold text-foreground">Units</h2>

	<button
		class="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted active:bg-border"
		onclick={() => goto(`/projects/${projectId}/files`)}
	>
		Project Files
		<Folder class="h-4 w-4 opacity-80" />
	</button>

	<button
		class="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted active:bg-border"
		onclick={openCreateUnitModal}
	>
		Add Unit
		<Plus class="h-4 w-4 opacity-80" />
	</button>

	<button
		class="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted active:bg-border"
		onclick={getBillOfMaterials}
	>
		Bill of Materials
		<Download class="h-4 w-4 opacity-80" />
	</button>
</div>

<!-- Units Grid -->
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each units as unit}
		<div class="block">
			<ListUnitsDashboardCard {unit} {reloadUnits} />
		</div>
	{/each}
</div>
