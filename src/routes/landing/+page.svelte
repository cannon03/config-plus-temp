<script>
	import { Lock, ArrowRight, CheckCircle } from 'lucide-svelte';
</script>

<div class="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
	<div class="text-center sm:mx-auto sm:w-full sm:max-w-3xl">
		<div class="flex justify-center">
			<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
				<Lock class="h-8 w-8 text-white" />
			</div>
		</div>

		<!-- Headline -->
		<h1 class="mt-6 text-4xl leading-tight font-extrabold text-gray-900">
			Simplify Your Smart Home Configuration
		</h1>
		<p class="mt-4 text-lg text-gray-600">
			Control, customize, and monitor all your Toyama RCU devices in one secure dashboard.
		</p>

		<!-- CTA -->
		<div class="mt-8 flex justify-center">
			<button
				class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				on:click={() => {
					location.href = '/auth';
				}}
			>
				Get Started
				<ArrowRight class="ml-2 h-5 w-5" />
			</button>
		</div>
	</div>

	<!-- Hero Illustration / Image -->
	<div class="mt-12 sm:mx-auto sm:w-full sm:max-w-4xl">
		<img
			src="/images/dashboard-preview.png"
			alt="Toyama Dashboard Preview"
			class="w-full rounded-lg object-cover shadow-lg"
		/>
	</div>

	<!-- Features Section -->
	<div class="mt-16 bg-white py-12 shadow-inner">
		<div class="mx-auto max-w-5xl px-4 text-center">
			<h2 class="text-2xl font-bold text-gray-900">Why Choose Toyama RCU?</h2>
			<p class="mt-2 text-gray-600">
				Manage every endpoint, scene, and automation with confidence.
			</p>

			<div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
				<div class="flex flex-col items-center">
					<CheckCircle class="h-10 w-10 text-blue-600" />
					<h3 class="mt-4 font-semibold text-gray-800">Seamless Control</h3>
					<p class="mt-2 text-sm text-gray-600">
						Instantly control lighting, fans, and thermostats with real-time feedback.
					</p>
				</div>

				<div class="flex flex-col items-center">
					<CheckCircle class="h-10 w-10 text-blue-600" />
					<h3 class="mt-4 font-semibold text-gray-800">Secure Access</h3>
					<p class="mt-2 text-sm text-gray-600">
						Your configurations are protected with token-based authentication and encrypted APIs.
					</p>
				</div>

				<div class="flex flex-col items-center">
					<CheckCircle class="h-10 w-10 text-blue-600" />
					<h3 class="mt-4 font-semibold text-gray-800">Fast Setup</h3>
					<p class="mt-2 text-sm text-gray-600">
						Get started in minutes with our simple onboarding and pre-configured templates.
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Social Proof / Footer -->
	<div class="mt-12 pb-8 text-center text-sm text-gray-500">
		<p>Trusted by smart home integrators and hobbyists worldwide 🌍</p>
		<p class="mt-2">© {new Date().getFullYear()} Toyama Controls and Systems</p>
	</div>
</div>
