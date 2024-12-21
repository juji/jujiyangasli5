<script>
  let { children } = $props();
</script>

<div class="container">
  {@render children()}
</div>

<style>
  .container{
    position: relative;
    max-width: var(--page-width);
    padding: 0 var(--page-padding);
    margin: 0 auto;
    z-index: 2;
  }
</style>