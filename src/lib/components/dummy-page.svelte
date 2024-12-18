<script>
  let { children } = $props();
</script>

<div class="dummy">
  {@render children()}
</div>

<style>
  .dummy{
    min-height: 100vh;
  }
</style>