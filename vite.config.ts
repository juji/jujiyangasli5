import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/** @type {import('vite').Plugin} */
const viteServerConfig = () => ({
	name: 'add-headers',
	// @ts-expect-error
	configureServer: (server) => {
		// @ts-expect-error
		server.middlewares.use((_, res, next) => {
			res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
			res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
			next();
		});
	}
});

export default defineConfig({
	plugins: [
		sveltekit(), 
		viteServerConfig()
	],
	server: {
		hmr: {
			overlay: false
		}
	}
});
