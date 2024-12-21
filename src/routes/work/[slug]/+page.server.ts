import { error } from '@sveltejs/kit';
import { works } from '$lib/data/works/data.server.js';
import content from '$lib/data/work-content/index.server.js'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

  const work = works.find(v => v.id === params.slug)

  if(!work) {
    error(404)
  }

  return {
    work,
    content: content[ work.id ]
  };
}
