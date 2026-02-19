<script>
	import { goto } from '$app/navigation';
	import { Lock, ArrowRight, CheckCircle } from 'lucide-svelte';
</script>

<div class="flex min-h-screen flex-col justify-center bg-background py-12 sm:px-6 lg:px-8">
	<div class="text-center sm:mx-auto sm:w-full sm:max-w-3xl">
		<div class="flex justify-center">
			<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-md">
				<Lock class="h-8 w-8 text-primary-foreground" />
			</div>
		</div>

		<!-- Headline -->
		<h1 class="mt-6 text-4xl leading-tight font-extrabold text-foreground">
			Simplify Your Smart Home Configuration
		</h1>
		<p class="mt-4 text-lg text-muted-foreground">
			Control, customize, and monitor all your Toyama RCU devices in one secure dashboard.
		</p>

		<!-- CTA -->
		<div class="mt-8 flex justify-center">
			<button
				class="inline-flex items-center rounded-lg border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
				on:click={() => {
					goto('/auth');
				}}
			>
				Get Started
				<ArrowRight class="ml-2 h-5 w-5" />
			</button>
		</div>
	</div>

	<!-- Hero Illustration -->
	<div class="mt-12 sm:mx-auto sm:w-full sm:max-w-4xl">
		<img
			src="/images/dashboard-preview.png"
			alt="Toyama Dashboard Preview"
			class="w-full rounded-xl object-cover shadow-lg"
		/>
	</div>

	<!-- Features Section -->
	<div class="mt-16 rounded-xl bg-card py-12 shadow-inner">
		<div class="mx-auto max-w-5xl px-4 text-center">
			<h2 class="text-2xl font-bold text-foreground">Why Choose Toyama RCU?</h2>
			<p class="mt-2 text-muted-foreground">
				Manage every endpoint, scene, and automation with confidence.
			</p>

			<div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
				<div class="flex flex-col items-center">
					<CheckCircle class="h-10 w-10 text-secondary" />
					<h3 class="mt-4 font-semibold text-foreground">Seamless Control</h3>
					<p class="mt-2 text-sm text-muted-foreground">
						Instantly control lighting, fans, and thermostats with real-time feedback.
					</p>
				</div>

				<div class="flex flex-col items-center">
					<CheckCircle class="h-10 w-10 text-secondary" />
					<h3 class="mt-4 font-semibold text-foreground">Secure Access</h3>
					<p class="mt-2 text-sm text-muted-foreground">
						Your configurations are protected with token-based authentication and encrypted APIs.
					</p>
				</div>

				<div class="flex flex-col items-center">
					<CheckCircle class="h-10 w-10 text-secondary" />
					<h3 class="mt-4 font-semibold text-foreground">Fast Setup</h3>
					<p class="mt-2 text-sm text-muted-foreground">
						Get started in minutes with our simple onboarding and pre-configured templates.
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="mt-12 pb-8 text-center text-sm text-muted-foreground">
		<p>Trusted by smart home integrators and hobbyists worldwide 🌍</p>
		<p class="mt-2">© {new Date().getFullYear()} Toyama Controls and Systems</p>
	</div>
</div>
