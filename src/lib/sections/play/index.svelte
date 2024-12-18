<script lang="ts">
  import DummyPage from "$lib/components/dummy-page.svelte";
  import MenuObserver from '$lib/components/menu-observer.svelte';

  let intersectingElm: HTMLDivElement | null = $state(null);

</script>

<MenuObserver element={intersectingElm} id="play">
<DummyPage>
  <div id="play" bind:this={intersectingElm}>
    this is play
  </div>
</DummyPage>
</MenuObserver>