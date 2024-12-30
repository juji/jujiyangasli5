<script lang="ts">
  import Thumbnail from './thumbnail.svelte';

  let elm: HTMLElement;

  let { 
    works, 
    setTransition,
    fadeOutDelay,
    fromWork
  } = $props();
  
  let fadeOut = $state(false)
  function onThumbnailClick(i: number){
    return function({ image }:{ image: string }){
      fadeOut = true
      setTransition(image)
    }
  }

</script>

<section id="works" bind:this={elm}>
  <h2 class="section-title">Works</h2>
  <div class="works">
    {#each works as work, index}<Thumbnail 
      onThumbnailClick={onThumbnailClick(index)}
      fromWork={fromWork === work.id}
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