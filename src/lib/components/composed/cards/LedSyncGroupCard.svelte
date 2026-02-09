<script lang="ts">
	import { deleteLedSyncGroup } from '$lib/api/led_config';
	import type { LedSyncGroupResponse } from '$lib/types/domain_graph';
	import { Trash2, Users } from 'lucide-svelte';

	let { group }: { group: LedSyncGroupResponse } = $props();

	let deleting = $state(false);

	async function handleDelete() {
		if (!confirm(`Delete sync group "${group.name || 'Unnamed'}"?`)) return;
		deleting = true;
		try {
			await deleteLedSyncGroup(group.id);
		} finally {
			deleting = false;
		}
	}
</script>

<div
	class="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-green-200 hover:shadow-md"
>
	<!-- Header -->
	<div class="mb-3 flex items-start justify-between">
		<div class="flex items-center gap-2">
			<Users class="h-5 w-5 text-green-500" />
			<h4 class="font-medium text-gray-900">
				{group.name || `Sync Group ${group.id}`}
			</h4>
		</div>
		<button
			onclick={handleDelete}
			disabled={deleting}
			class="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
			title="Delete sync group"
		>
			<Trash2 class="h-4 w-4" />
		</button>
	</div>

	<!-- Members -->
	<div>
		<p class="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
			Synced Members ({group.members.length})
		</p>
		<div class="flex flex-wrap gap-2">
			{#each group.members as member}
				<span
					class="inline-flex items-center rounded-lg border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
				>
					<span class="font-mono">{member.address}:{member.key}</span>
				</span>
			{/each}
		</div>
	</div>

	<!-- Info -->
	<p class="mt-3 text-xs text-gray-400">
		{group.members.length * (group.members.length - 1)} cross-mappings auto-generated
	</p>
</div>
