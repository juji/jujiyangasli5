<script>
  let { 
    children, 
    className = '' 
  } = $props();
</script>

<div class={`container${className?` ${className}`:''}`} >
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