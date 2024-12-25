<script lang="ts">
  import { sectionInView } from '$lib/functions/section-in-view';
  import Thumbnail from './thumbnail.svelte';

  let elm: HTMLElement;

  let { works } = $props();
  let inView = $state(false)
  $effect(() => { sectionInView( elm, () => { 
    inView = true
  } ) })

</script>

<section id="works" bind:this={elm}>
  <h2 class="section-title">Works</h2>
  <div class="works">
    {#each works as work, index}<Thumbnail 
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