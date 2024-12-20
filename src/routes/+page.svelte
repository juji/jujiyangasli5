<script>
  import GrainyThing from '$lib/components/grainy-thing/index.svelte'
  import Hero from '$lib/sections/hero/index.svelte'
  import Works from '$lib/sections/works/index.svelte'
  import Play from '$lib/sections/play/index.svelte'
  import Techs from '$lib/sections/techs/index.svelte'
  import Contact from '$lib/sections/contact/index.svelte'

  let js = $state(false)
  $effect(() => { if(!js) js = true })

  /** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

</script>

<main>
  <GrainyThing />
  <div class="container">
    <Hero />
  </div>
  <div class="nojs-overlay" class:js>
    <div class="container">
      <Works works={data.works} />
      <Play play={data.play} />
      <Techs techs={data.techs} />
    </div>
  </div>
</main>
<footer>
  <div class="container">
    <Contact />
  </div>
</footer>

<style>

  footer{
    position: relative;
    padding: 2rem 0;
    border-top: 1px solid var(--border-color);
  }

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

  .container{
    position: relative;
    max-width: var(--page-width);
    padding: 0 var(--page-padding);
    margin: 0 auto;
    z-index: 2;
  }
</style>