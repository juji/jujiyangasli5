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

  let js = $state(false)
  $effect(() => { if(!js) js = true })

  /** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

  $effect(() => {
    let scrollToTop = new ScrollToTop()

    return () => {
      scrollToTop.destroy()
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
  <HeroAnimation />
  <Container>
    <Hero />
  </Container>
  <div class="nojs-overlay" class:js>
    <Container>
      <Works works={data.works} />
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