<script>
  import Contact from '$lib/components/contact/index.svelte'
  import Container from '$lib/components/container.svelte'
</script>


<footer>
  <Container>
    <Contact />
  </Container>
</footer>

<style>
  footer{
    position: relative;
    padding: 2rem 0;
    border-top: 1px solid var(--border-color);
    z-index: 2;
    background-color: rgb(from var(--background-color) r g b / 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
</style>