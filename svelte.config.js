import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: 'index.html' // 👈 Vercel SPA fallback MUST be index.html
		}),
		prerender: {
			entries: [] // 👈 optional but recommended for SPA mode
		}
	}
};

export default config;
