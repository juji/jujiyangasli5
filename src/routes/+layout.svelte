<script lang="ts">
  import { page } from '$app/state';

  import 'sanitize.css';
  import 'sanitize.css/typography.css';
  import 'sanitize.css/assets.css';
  import 'sanitize.css/forms.css';
  import 'minireset.css';
  import 'lenis/dist/lenis.css'
  
  import '$lib/styles/fonts.css';
  import '$lib/styles/main.css';
  import 'sanitize.css/reduce-motion.css';
  import '$lib/styles/view-transition.css';

  import { viewTransition } from '$lib/functions/view-transition';
  import Footer from '$lib/components/footer.svelte'
  import LoadingIndicator from '$lib/components/loading-indicator.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { ScrollWheelHijacker } from '$lib/functions/scrollwheel-hijacker'

  let { children } = $props();
  let hijacker: ScrollWheelHijacker | null = null
  viewTransition();

  beforeNavigate(() => {
    if(hijacker) {
      hijacker.destroy()
      hijacker = null
    }
  })

  afterNavigate(() => {
    if(!hijacker) hijacker = new ScrollWheelHijacker()
  })

  $effect(() => {
    if(!hijacker) hijacker = new ScrollWheelHijacker()
    return () => {
      if(hijacker) hijacker.destroy()
      hijacker = null
    }
  })

</script>

<svelte:head>
  <link rel="icon" href={`${page.url.origin}/icons/favicon.ico`} sizes="any" />
  <link rel="icon" href={`${page.url.origin}/icons/favicon-16x16.png`} type="image/png" sizes="16x16" />
  <link rel="icon" href={`${page.url.origin}/icons/favicon-32x32.png`} type="image/png" sizes="32x32" />
  <link rel="icon" href={`${page.url.origin}/icons/favicon-48x48.png`} type="image/png" sizes="48x48" />
  <link rel="icon" href={`${page.url.origin}/icons/android-chrome-192x192.png`} type="image/png" sizes="192x192" />
  <link rel="icon" href={`${page.url.origin}/icons/android-chrome-512x512.png`} type="image/png" sizes="512x512" />
  <link rel="icon" href={`${page.url.origin}/icons/favicon.svg`} type="image/svg+xml" />
  <link rel="apple-touch-icon" href={`${page.url.origin}/icons/apple-touch-icon.png`} sizes="180x180" />
  <link rel="mask-icon" href={`${page.url.origin}/icons/favicon.svg`} color="#000000" />
  <meta name="theme-color" content="#000000" />
</svelte:head>

{@render children()}
<Footer />
<LoadingIndicator />
