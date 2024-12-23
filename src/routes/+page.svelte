<script>

  import HeroAnimation from '$lib/components/hero-animation.svelte'
  import Hero from '$lib/components/sections/hero/index.svelte'
  import Works from '$lib/components/sections/works/index.svelte'
  import Play from '$lib/components/sections/play/index.svelte'
  import Techs from '$lib/components/sections/techs/index.svelte'
  import Container from '$lib/components/container.svelte'
  import Menu from '$lib/components/menu/index.svelte'

  let js = $state(false)
  $effect(() => { if(!js) js = true })

  /** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

</script>

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

    position: relative;

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