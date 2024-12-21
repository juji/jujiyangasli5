<script>
  import Contact from '$lib/components/sections/contact/index.svelte'
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
  }
</style>