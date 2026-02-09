<script lang="ts">
	import { deleteCustomLedMapping } from '$lib/api/led_config';
	import type { CustomLedMappingResponse } from '$lib/types/domain_graph';
	import { Link2, Trash2 } from 'lucide-svelte';

	let { mapping }: { mapping: CustomLedMappingResponse } = $props();

	let deleting = $state(false);

	async function handleDelete() {
		if (!confirm(`Delete mapping "${mapping.name || 'Unnamed'}"?`)) return;
		deleting = true;
		try {
			await deleteCustomLedMapping(mapping.id);
		} finally {
			deleting = false;
		}
	}

	const stateLabel = (state: 0 | 1) => (state === 1 ? 'ON' : 'OFF');
	const stateBadgeClass = (state: 0 | 1) =>
		state === 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600';
</script>

<div
	class="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
>
	<!-- Header -->
	<div class="mb-3 flex items-start justify-between">
		<div class="flex items-center gap-2">
			<Link2 class="h-5 w-5 text-blue-500" />
			<h4 class="font-medium text-gray-900">
				{mapping.name || `Mapping ${mapping.x_address}-${mapping.x_key}`}
			</h4>
		</div>
		<button
			onclick={handleDelete}
			disabled={deleting}
			class="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
			title="Delete mapping"
		>
			<Trash2 class="h-4 w-4" />
		</button>
	</div>

	<!-- Trigger Info -->
	<div class="mb-3 rounded-lg bg-gray-50 p-3">
		<p class="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase">When triggered</p>
		<div class="flex items-center gap-2 text-sm">
			<span class="font-mono text-gray-700">
				Address {mapping.x_address}, Key {mapping.x_key}
			</span>
			<span class="rounded-full px-2 py-0.5 text-xs font-medium {stateBadgeClass(mapping.x_state)}">
				{stateLabel(mapping.x_state)}
			</span>
		</div>
	</div>

	<!-- LED Targets -->
	<div>
		<p class="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">Set LEDs</p>
		<div class="flex flex-wrap gap-2">
			{#each mapping.led_targets as target}
				<span
					class="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700"
				>
					<span class="font-mono">{target.address}:{target.key}</span>
					<span class="rounded px-1 {stateBadgeClass(target.state)}">
						{stateLabel(target.state)}
					</span>
				</span>
			{/each}
		</div>
	</div>
</div>
