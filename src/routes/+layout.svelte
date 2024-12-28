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
  // import Lenis from 'lenis'
  // import LocomotiveScroll from 'locomotive-scroll';
  import { HijackScrollWheel } from '$lib/functions/hijack-scrollwheel'

  let { children } = $props();

  viewTransition();

  // let lenis: Lenis | null = null
  // let locoScroll: LocomotiveScroll | null = null
  beforeNavigate(() => {
    // if(lenis) lenis.destroy()
    // lenis = null
    // if(locoScroll) locoScroll.destroy()
  })

  afterNavigate(() => {
    
    // locoScroll = new LocomotiveScroll({
    //   smooth: true
    // })
    // if(lenis) lenis.destroy()
    // lenis = new Lenis({
    //   autoRaf: true,
    //   lerp: 0.1,
    //   easing: (x: number) => x * x * x * x
    // });
    // lenis.on('virtual-scroll', ({ deltaX, deltaY, event }) => {
    //   window.dispatchEvent(new CustomEvent("hijacked-scroll", {
    //     detail: {
    //       deltaX, deltaY, event
    //     },
    //   }))
    // })
  })

  $effect(() => {
    const hijacker = new HijackScrollWheel()
    return () => { hijacker.destroy() }
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