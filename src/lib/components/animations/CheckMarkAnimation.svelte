<script lang="ts">
	import { onMount } from 'svelte';

	let animate = false;

	onMount(() => {
		animate = false;
		requestAnimationFrame(() => (animate = true));
	});
</script>

<div
	class="flex items-center justify-center rounded-full bg-green-500 p-6 shadow-lg transition-all duration-500 ease-out"
	class:scale-100={animate}
	class:scale-90={!animate}
>
	<svg viewBox="0 0 100 100" class="h-20 w-20" xmlns="http://www.w3.org/2000/svg">
		<circle
			cx="50"
			cy="50"
			r="45"
			fill="none"
			stroke="white"
			stroke-width="8"
			class={animate ? 'animate-draw-circle' : ''}
		/>
		<path
			d="M30 50 L45 65 L70 35"
			fill="none"
			stroke="white"
			stroke-width="8"
			stroke-linecap="round"
			stroke-linejoin="round"
			class={animate ? 'animate-draw-check' : ''}
		/>
	</svg>
</div>

<style>
	@keyframes draw-circle {
		from {
			stroke-dasharray: 283;
			stroke-dashoffset: 283;
		}
		to {
			stroke-dasharray: 283;
			stroke-dashoffset: 0;
		}
	}

	@keyframes draw-check {
		from {
			stroke-dasharray: 100;
			stroke-dashoffset: 100;
		}
		to {
			stroke-dasharray: 100;
			stroke-dashoffset: 0;
		}
	}

	.animate-draw-circle {
		stroke-dasharray: 283;
		stroke-dashoffset: 283;
		animation: draw-circle 0.8s cubic-bezier(0.65, 0, 0.45, 1) forwards;
	}

	.animate-draw-check {
		stroke-dasharray: 100;
		stroke-dashoffset: 100;
		animation: draw-check 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.7s forwards;
	}
</style>
