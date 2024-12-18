<script>
  import GrainyThing from '$lib/components/grainy-thing/index.svelte'
  import Hero from '$lib/sections/hero/index.svelte'
  import Works from '$lib/sections/works/index.svelte'
  import Play from '$lib/sections/play/index.svelte'

  let js = $state(false)
  $effect(() => { if(!js) js = true })
</script>

<main>
  <GrainyThing />
  <div class="container">
    <Hero />
  </div>
  <div class="nojs-overlay" class:js>
    <div class="container">
      <Works />
      <Play />
    </div>
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
    
    .container{
      position: relative;
      max-width: var(--page-width);
      padding: 0 var(--page-padding);
      margin: 0 auto;
      z-index: 2;
    }

  }
</style>