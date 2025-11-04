<script lang="ts">
	import { CalendarDays, Info, Folder } from 'lucide-svelte';
	import Button from '$lib/components/base/Button.svelte';
	import { goto } from '$app/navigation';
	import type { Unit } from '$lib/types/unit';

	const { unit }: { unit: Unit } = $props();

	const createdAtDate = new Date(unit.created_at);
	const updatedAtDate = new Date(unit.updated_at);

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
</script>

<div
	class="group flex h-[32vh] w-[22vw] flex-col justify-between rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
>
	<!-- Header -->
	<div class="border-b border-gray-100 px-6 py-5">
		<h2
			class="mb-1 truncate text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600"
		>
			{unit.name}
		</h2>
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
