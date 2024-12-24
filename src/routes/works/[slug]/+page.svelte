<script lang="ts">

  import type { Work } from "$lib/data/works/types";
  import { page } from '$app/state';
  import WorkDetails from "$lib/components/work-details/index.svelte";

  /** @type {{ data: import('./$types').PageData }} */
	let { data }: { data: { 
    work: Work
    content: string 
  } } = $props();

</script>

<svelte:head>
  <title>juji: {data.work.title}</title>
  <meta name="description" content={`Checkout juji's work: ${data.work.title}.`} />

  <meta property="og:url" content={`${page.url.href}`} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={`juji: ${data.work.title}`} />
  <meta property="og:description" content={`Checkout juji's work: ${data.work.title}.`} />
  <meta property="og:image" content={`${page.url.origin}${data.work.images[0].url}`} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={`${page.url.host}`} />
  <meta property="twitter:url" content={`${page.url.href}`} />
  <meta name="twitter:title" content={`juji: ${data.work.title}`} />
  <meta name="twitter:description" content={`Checkout juji's work: ${data.work.title}.`} />
  <meta name="twitter:image" content={`${page.url.origin}${data.work.images[0].url}`} />
</svelte:head>

<WorkDetails data={data} />