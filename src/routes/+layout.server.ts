


/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url, setHeaders }) {

  setHeaders({
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp"
  });

  return {};
}
