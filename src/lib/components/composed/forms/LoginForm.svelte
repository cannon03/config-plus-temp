<script lang="ts">
	import type { AuthRequest, AuthResult } from '$lib/types/auth';
	import { login } from '$lib/api/auth';
	import { setAccessToken, setUserId, setUsername } from '$lib/utils/storage';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/base/Button.svelte';
	import Input from '../../base/Input.svelte';

	let credentials = $state<AuthRequest>({
		username: '',
		password: ''
	});

	async function handleInputUsername(e: Event) {
		credentials.username = (e.target as HTMLInputElement).value;
	}

	async function handleInputPassword(e: Event) {
		credentials.password = (e.target as HTMLInputElement).value;
	}

	async function handleLogin(e: Event) {
		e.preventDefault();
		const authResult: AuthResult = await login(credentials);
		setUsername(authResult.user.username);
		setUserId(authResult.user.id);
		setAccessToken(authResult.token);

		await goto('/projects', { replaceState: true });
	}
</script>

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	<div class="rounded-xl border border-border bg-card px-4 py-8 shadow-md sm:px-10">
		<form class="space-y-6" onsubmit={handleLogin}>
			<div>
				<label for="username" class="block text-sm font-medium text-foreground"> Username </label>
				<div class="mt-1">
					<Input
						id="username"
						type="text"
						value={credentials.username}
						oninput={handleInputUsername}
						placeholder="Enter Username"
						variant="standard"
					/>
				</div>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-foreground"> Password </label>
				<div class="relative mt-1">
					<Input
						id="password"
						name="password"
						type="password"
						value={credentials.password}
						oninput={handleInputPassword}
						placeholder="Enter password"
						variant="standard"
					/>
				</div>
			</div>

			<div>
				<Button type="submit">Sign In</Button>
			</div>
		</form>

		<div class="mt-6">
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-border"></div>
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="bg-card px-2 text-muted-foreground">API Authentication</span>
				</div>
			</div>
			<div class="mt-4 text-center text-sm text-muted-foreground">
				<p>Enter your API credentials to access the configuration tool</p>
				<p class="mt-2 text-xs text-muted-foreground">
					Contact your administrator for access credentials
				</p>
			</div>
		</div>
	</div>
</div>
