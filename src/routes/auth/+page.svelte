<script lang="ts">
	import { Lock } from 'lucide-svelte';
	import LoginForm from '$lib/components/composed/forms/LoginForm.svelte';
	import { fetchProjects } from '$lib/api/project';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		if ((await fetchProjects()) != null) {
			goto('/projects', { replaceState: true });
		}
	});
</script>

<div class="flex min-h-screen flex-col justify-center bg-background py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<div class="flex justify-center">
			<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-md">
				<Lock class="h-8 w-8 text-primary-foreground" />
			</div>
		</div>
		<h2 class="mt-6 text-center text-3xl font-extrabold text-foreground">
			Toyama RCU Configuration
		</h2>
		<p class="mt-2 text-center text-sm text-muted-foreground">
			Sign in to access the configuration tool
		</p>
	</div>
	<LoginForm />
</div>
