<script lang="ts">
  import { sectionInView } from '$lib/funtions/section-in-view';

  let elm: HTMLElement;

  let { works } = $props();
  
  $effect(() => { sectionInView( elm ) })

</script>

<section id="works" bind:this={elm}>
  <h2 class="section-title">Works</h2>
  <div class="works">
    
  </div>
</section>

<style>
  .works{

  }
</style>