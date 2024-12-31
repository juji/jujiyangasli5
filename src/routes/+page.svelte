<script lang="ts">

  import HeroAnimation from '$lib/components/hero-animation/index.svelte'
  import Hero from '$lib/components/sections/hero/index.svelte'
  import Works from '$lib/components/sections/works/index.svelte'
  import Play from '$lib/components/sections/play/index.svelte'
  import Techs from '$lib/components/sections/techs/index.svelte'
  import Container from '$lib/components/container.svelte'
  import Menu from '$lib/components/menu/index.svelte'
  import { page } from '$app/state';
  import { ScrollToTop } from '$lib/modules/scroll-to-top'
  import { globalState } from '$lib/modules/global.svelte.js'
  import { FpsMonitor, type FpsMonitorResult } from '$lib/modules/fps-monitor.js'

  let js = $state(false)
  $effect(() => { if(!js) js = true })

  /** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();


  // force scroll to top
  $effect(() => {
    
    let scrollToTop = new ScrollToTop({
      onScrollStart: () => {
        const isScrolling = globalState.scrollWheelHijacker?.isScrolling()
        if(isScrolling) globalState.scrollWheelHijacker?.scrollToTop()

        return !(isScrolling)
      }
    })

    return () => {
      scrollToTop.destroy()
    }
  })

  // work transition delay
  const fadeOutDelay = 350
  function setWorksTransition(image: string){
    globalState.viewTransitionDelay = fadeOutDelay
    globalState.waitForAssets = new Promise((r) => {
      const img = new Image()
      img.onload = () => { r() }
      img.src = image
    })
  }

  // if this comes from work page
  $effect(() => {
    if(globalState.fromWork)
    setTimeout(() => {
      globalState.fromWork = null
    },1000)
  })

  let hasGoodFpsResult = (value: boolean) => {}
  let hasGoodFpsPromise: Promise<boolean> = $state(
    new Promise(r => { hasGoodFpsResult = r })
  )

  $effect(() => {
    
    const onBeforeCount = () => {
      hasGoodFpsPromise = new Promise((r) => {
        hasGoodFpsResult = r
      })
    }

    const onAfterCount = (p: FpsMonitorResult) => {
      hasGoodFpsResult(p.isGoodFps)
    }

    FpsMonitor.onBeforeCount(onBeforeCount)
    FpsMonitor.onAfterCount(onAfterCount)

    return () => {
      FpsMonitor.removeOnAfterCount(onAfterCount)
      FpsMonitor.removeOnBeforeCount(onBeforeCount)
    }
  })

</script>

<svelte:head>
  <title>Juji: Web Developer</title>
  <meta name="description" content="Hello, my name is Tri Rahmat Gunadi, and i like to code stuff." />
  <meta name="color-scheme" content="dark" />

  <meta property="og:url" content={`${page.url.origin}`} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Juji: Web Developer" />
  <meta property="og:description" content="Hello, my name is Tri Rahmat Gunadi, and i like to code stuff." />
  <meta property="og:image" content={`${page.url.origin}/images/juji-1200-630.jpeg`} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={`${page.url.host}`} />
  <meta property="twitter:url" content={`${page.url.origin}`} />
  <meta name="twitter:title" content="Juji: Web Developer" />
  <meta name="twitter:description" content="Hello, my name is Tri Rahmat Gunadi, and i like to code stuff." />
  <meta name="twitter:image" content={`${page.url.origin}/images/juji-800-418.jpeg`} /> 
</svelte:head>

<Menu />
<main>
  <HeroAnimation hasGoodFps={hasGoodFpsPromise} />
  <Container>
    <Hero />
  </Container>
  <div class="nojs-overlay" class:js>
    <Container>
      <Works 
        works={data.works} 
        setTransition={setWorksTransition} 
        fadeOutDelay={fadeOutDelay}
        fromWork={globalState.fromWork}
      />
      <Play play={data.play} />
      <Techs techs={data.techs} />
    </Container>
  </div>
</main>


<style>

  main{

    .nojs-overlay{
      position: relative;
      background-color: rgba(0,0,0,0.8);
      z-index: 1;

      &.js{
        background-color: transparent;
      }
    }
    
    
  }

</style>

<!-- {#if browser}
<script src="/scroll-timeline.js"></script>
{/if} -->