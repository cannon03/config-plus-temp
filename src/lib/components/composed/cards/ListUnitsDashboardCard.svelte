<script lang="ts">
	import {
		CalendarDays,
		Info,
		Folder,
		Trash2,
		Edit2,
		Edit,
		Edit3,
		Pencil,
		StickyNote
	} from 'lucide-svelte';
	import Button from '$lib/components/base/Button.svelte';
	import { goto } from '$app/navigation';
	import type { Unit } from '$lib/types/unit';
	import Modal from '../modals/Modal.svelte';
	import CreateUnitForm from '../forms/CreateUnitForm.svelte';
	import { deleteUnit } from '$lib/api/unit';

	const { unit, reloadUnits }: { unit: Unit; reloadUnits: () => void } = $props();

	const createdAtDate = new Date(unit.created_at);
	const updatedAtDate = new Date(unit.updated_at);

	let showModal = $state(false);
	let showEditModal = $state(false);
	let showUnitModal = $state(false);

	const formattedCreatedAt = createdAtDate.toLocaleDateString('en-IN', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	const formattedUpdatedAt = updatedAtDate.toLocaleDateString('en-IN', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	function handleViewUnit() {
		goto(`/units/${unit.id}/dashboard`);
	}

	async function del(e: Event) {
		await deleteUnit(unit.id);
		showModal = false;
		reloadUnits();
	}

	$effect(() => {
		if (!showEditModal) {
			reloadUnits();
		}
	});
</script>

<Modal bind:showModal title="Delete Unit">
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="text-sm text-gray-600">
			Are you sure you want to delete this Unit? This action cannot be undone.
		</p>

		<div class="mt-4 flex gap-3">
			<button
				onclick={del}
				class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
			>
				Yes, Delete
			</button>
			<button
				onclick={() => (showModal = false)}
				class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
			>
				Cancel
			</button>
		</div>
	</div>
</Modal>

<Modal bind:showModal={showEditModal} title="Edit Unit">
	<CreateUnitForm projectId={unit.project} bind:showModal={showEditModal} {unit} />
</Modal>

<div
	class="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
>
	<!-- Header -->
	<div class="border-b border-gray-100 px-6 py-5">
		<div class="flex justify-between">
			<h2
				class="mb-1 truncate text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600"
			>
				{unit.name}
			</h2>
			<div class="flex gap-2">
				<button onclick={() => (showEditModal = true)}>
					<Pencil
						class="h-4 w-4 text-gray-600 opacity-80 hover:cursor-pointer hover:text-gray-900"
					/>
				</button>
				<button onclick={() => (showModal = true)}
					><Trash2
						class="h-4 w-4 text-red-600 opacity-80 hover:cursor-pointer hover:text-red-800"
					/></button
				>
			</div>
		</div>
		<p class="line-clamp-2 text-sm text-gray-500">
			{unit.description || 'No description available.'}
		</p>
	</div>

	<!-- Details -->
	<div class="grow space-y-3 px-6 py-4">
		<div class="flex items-center gap-3 text-sm text-gray-700">
			<Folder class="h-4 w-4 text-gray-500" />
			<span>Project ID: <span class="font-medium text-gray-900">{unit.project}</span></span>
		</div>

		{#if unit.notes?.trim()}
			<div
				class="group/notes flex items-start gap-3 text-sm text-gray-700 transition-colors hover:text-gray-900"
			>
				<StickyNote
					class="mt-0.5 h-4 w-4 shrink-0 text-gray-500 transition-colors group-hover/notes:text-blue-500"
				/>
				<div class="flex min-w-0 flex-col">
					<span class="font-medium text-gray-900">Notes:</span>
					<p class="line-clamp-2 leading-relaxed text-gray-600" title={unit.notes}>
						{unit.notes}
					</p>
				</div>
			</div>
		{/if}

		<div class="flex items-center gap-3 text-sm text-gray-700">
			<CalendarDays class="h-4 w-4 text-gray-500" />
			<span>Created: <span class="font-medium text-gray-900">{formattedCreatedAt}</span></span>
		</div>

		<div class="flex items-center gap-3 text-sm text-gray-700">
			<Info class="h-4 w-4 text-gray-500" />
			<span>Updated: <span class="font-medium text-gray-900">{formattedUpdatedAt}</span></span>
		</div>
	</div>

	<!-- Footer -->
	<div class="flex justify-end border-t border-gray-100 px-5 py-3">
		<Button variant="projects" onclick={handleViewUnit} class="flex items-center gap-2">
			<Info class="h-4 w-4" />
			<span>View Unit</span>
		</Button>
	</div>
</div>
