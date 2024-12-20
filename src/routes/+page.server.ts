import { works } from '$lib/data/works/data.server.js';
import { play } from '$lib/data/play/data.server.js';
import { techs } from '$lib/data/techs/data.server.js';
import type { WorkSingle } from '$lib/data/works/types.js';

const workSingles: WorkSingle[] = works.map(v => {
	const { images, ...rest } = v
	return {
		...rest,
		image: images[0]
	}
})

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		works: workSingles,
		play,
		techs
	};
}