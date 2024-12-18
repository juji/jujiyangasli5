<script>
  let { children, blend = false } = $props();
</script>




<div class={'wrapper'} class:blend={!!blend}>
{@render children()}
</div>


<style>
  .wrapper{

    position: relative;
    max-width: 900px;
    padding: 2rem;
    margin: 0 auto;
    z-index: 1;

    &.blend{
      mix-blend-mode: exclusion;
    }

  }
</style>