import { works } from '$lib/data/works/data.server.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		works
	};
}