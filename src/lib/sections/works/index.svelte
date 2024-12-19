<script lang="ts">
  import MenuObserver from '$lib/components/menu-observer.svelte';
  let intersectingElm: HTMLElement | null = $state(null);
  let intersecting = $state(false)

  let { works } = $props();
  
  $effect(() => {
    console.log('intersecting', intersecting)
    console.log(works)
  })

</script>

<MenuObserver element={intersectingElm} id="works" bind:intersecting>
  <section id="works" bind:this={intersectingElm}>
    <h2 class="section-title">Works</h2>
    <div class="works">
      
    </div>
  </section>
</MenuObserver>

<style>
  .works{

  }
</style>