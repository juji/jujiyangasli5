<script lang="ts">
  import { sectionInView } from '$lib/functions/section-in-view';

  let elm:HTMLElement
  $effect(() => { 
    sectionInView( elm ) 
  })

</script>


<section class="container" id="contact" bind:this={elm}>
  this is contact
</section>

<style>
  
</style>