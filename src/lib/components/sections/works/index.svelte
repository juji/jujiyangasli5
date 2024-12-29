<script lang="ts">
	import { globalState } from '$lib/modules/global.svelte';
  import Thumbnail from './thumbnail.svelte';

  let elm: HTMLElement;

  let { works } = $props();
  
  const fadeOutDelay = 350
  let fadeOut = $state(false)
  function onThumbnailClick(i: number){
    return function({ image }:{ image: string }){
      fadeOut = true
      globalState.viewTransitionDelay = fadeOutDelay
      globalState.waitForAssets = new Promise((r) => {
        const img = new Image()
        img.onload = () => { r() }
        img.src = image
      })
    }
  }

  $effect(() => {
    if(globalState.fromWork)
    setTimeout(() => {
      globalState.fromWork = null
    },1000)
  })

</script>

<section id="works" bind:this={elm}>
  <h2 class="section-title">Works</h2>
  <div class="works">
    {#each works as work, index}<Thumbnail 
      onThumbnailClick={onThumbnailClick(index)}
      fromWork={globalState.fromWork === work.id}
      fadeOutSpeed={fadeOutDelay}
      fadeOut={fadeOut}
      work={work} 
      index={index} 
    />{/each}
  </div>
</section>

<style>
  .works{
    display: grid;

    grid-template-columns: 1fr;
    grid-gap: 0.1rem;
    margin-bottom: 4rem;

    @media screen and (min-width: 800px) {
      grid-template-columns: 1fr 1fr;
    }

  }
</style>