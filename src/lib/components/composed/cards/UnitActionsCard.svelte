<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import { Download } from 'lucide-svelte';
</script>

<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
	<h3 class="mb-4 text-lg font-semibold text-gray-900">Actions</h3>

	<div class="space-y-3">
		<Button
			variant="standard"
			class="flex w-full items-center justify-between rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
		>
			<span>Electrical Layout</span>
			<Download class="h-4 w-4 opacity-90" />
		</Button>

		<Button
			variant="white"
			class="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
		>
			<span>RCU Mappings (JSON)</span>
			<Download class="h-4 w-4 text-gray-600 opacity-80" />
		</Button>
	</div>
</div>
