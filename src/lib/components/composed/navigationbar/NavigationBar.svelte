<script lang="ts">
	import { TreePine, ChevronRight } from 'lucide-svelte';
</script>

<nav class="border-b border-gray-200 bg-white shadow-sm">
	<div class="mx-auto w-full px-6">
		<div class="grid h-16 w-full grid-cols-3 items-center">
			<!-- Brand (Left) -->
			<div class="flex items-center space-x-3">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
					<TreePine class="h-5 w-5 text-white" />
				</div>
				<div>
					<h1 class="text-xl font-semibold text-gray-900">Toyama RCU</h1>
					<p class="text-sm text-gray-500">Configuration Tool</p>
				</div>
			</div>

			<!-- Breadcrumb (Center) -->
			<div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
				<span class="cursor-pointer hover:text-gray-700 hover:underline">Dashboard</span>
				<ChevronRight class="h-4 w-4" />
				<span class="font-medium text-gray-700">Project Name</span>
			</div>

			<!-- Empty Right (for balance or future items like profile/settings) -->
			<div></div>
		</div>
	</div>
</nav>
