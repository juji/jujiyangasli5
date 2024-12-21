import { works } from '$lib/data/works/data.server.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const work = works.find(v => v.id === params.slug)

  return {
    work,
  };
}
