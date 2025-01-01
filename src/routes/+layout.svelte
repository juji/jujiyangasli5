<script lang="ts">
  import { page } from '$app/state';

  import 'sanitize.css';
  import 'sanitize.css/typography.css';
  import 'sanitize.css/assets.css';
  import 'sanitize.css/forms.css';
  import 'minireset.css';
  
  import '$lib/styles/fonts.css';
  import '$lib/styles/main.css';
  import 'sanitize.css/reduce-motion.css';
  import '$lib/styles/view-transition.css';

  import { viewTransition } from '$lib/modules/view-transition';
  import Footer from '$lib/components/footer.svelte'
  import LoadingIndicator from '$lib/components/loading-indicator.svelte';

  import { ScrollWheelHijacker } from '$lib/modules/scrollwheel-hijacker'
  import { globalState } from '$lib/modules/global.svelte';
  import { FpsMonitor, type FpsMonitorResult } from '$lib/modules/fps-monitor';
  import focusableSelectors from 'focusable-selectors'
	import { afterNavigate } from '$app/navigation';


  let { children } = $props();
  let hijacker: ScrollWheelHijacker | null = null

  viewTransition();

  $effect(() => {
    if(!hijacker) hijacker = new ScrollWheelHijacker()
    globalState.scrollWheelHijacker = hijacker
    return () => {
      if(hijacker) hijacker.destroy()
      globalState.scrollWheelHijacker = null
      hijacker = null
    }
  })

  $effect(() => {
    FpsMonitor.start({
      onAfterCount: (data: FpsMonitorResult) => {

        // change hijacker's speed multipler 
        const speedMultiplier = hijacker?.getSpeedMultiplier()
        if(speedMultiplier){
          if(data.isGoodFps && speedMultiplier !== 1){
            // good fps, faster speed, so multiplier is 1
            hijacker?.setSpeedMultiplier(1)
          }

          if(!data.isGoodFps && speedMultiplier !== 3){
            // bad fps, lower speed, so multiplier is calculated
            hijacker?.setSpeedMultiplier( Math.round(data.goodFps / data.avgFps) )
          }
        }
      }
    })

    return () => {
      FpsMonitor.destroy()
    }
  })

  afterNavigate(() => {
    const selector = focusableSelectors.join(',')
    const elms = document.querySelectorAll(selector)
    elms.forEach(elm => {
      elm.addEventListener('mouseover',(e: Event) => {
        const el = e.target as HTMLElement
        el.classList.add('mouse')
      })
      elm.addEventListener('mouseout',(e: Event) => {
        const el = e.target as HTMLElement
        el.classList.remove('mouse')
      })
    })

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
<LoadingIndicator isLoading={globalState.loading} />
