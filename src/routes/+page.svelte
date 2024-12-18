<script>
  import Main from '$lib/components/main/index.svelte'
  import GrainyThing from '$lib/components/grainy-thing/index.svelte'
</script>

<main>
  <GrainyThing />
  <div class="container">
    <Main />
  </div>
</main>


<style>
  main{

    position: relative;
    
    .container{
      position: relative;
      max-width: var(--page-width);
      padding: 0 var(--page-padding);
      margin: 0 auto;
      z-index: 1;
    }

  }
</style>