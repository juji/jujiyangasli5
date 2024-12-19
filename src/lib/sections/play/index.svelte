<script lang="ts">
  import DummyPage from "$lib/components/dummy-page.svelte";
  import { sectionInView } from '$lib/funtions/section-in-view';

  let elm: HTMLElement
  $effect(() => { sectionInView( elm ) })

</script>


<DummyPage>
  <div id="play" bind:this={elm}>
    this is play
  </div>
</DummyPage>