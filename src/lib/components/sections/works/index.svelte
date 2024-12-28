<script lang="ts">
	import type { Work } from '$lib/data/works/types';
	import { globalState } from '$lib/modules/global.svelte';
  import { sectionInView } from '$lib/modules/section-in-view';
  import Thumbnail from './thumbnail.svelte';

  let elm: HTMLElement;

  let { works } = $props();
  let inView = $state(false)
  let fadeOut: null | {[key:string]: boolean} = $state(null)

  $effect(() => { 
    const stop = sectionInView( elm, () => { 
      inView = true
    }) 
    return () => stop()
  })

  function onThumbnailClick(i: number){
    return function(){
      fadeOut = works.reduce((a: {[key:string]: boolean}, _:Work, idx:number) => {
        if (idx === i) return a
        a[`key${idx}`] = true
        return a
      },{})
    }
  }

  let lastWork = $state('');
  $effect(() => {
    if(globalState.fromWork){
      lastWork = globalState.fromWork
      setTimeout(() => {
        globalState.fromWork = null
      },500)
    }
  })

</script>

<section id="works" bind:this={elm}>
  <h2 class="section-title">Works</h2>
  <div class="works">
    {#each works as work, index}<Thumbnail 
      onThumbnailClick={onThumbnailClick(index)}
      fadeOut={fadeOut && fadeOut[`key${index}`] || false}
      work={work} 
      inView={inView} 
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