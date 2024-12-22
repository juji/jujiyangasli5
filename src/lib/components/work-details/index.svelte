<script lang="ts">

  import type { Work } from "$lib/data/works/types";
  import Footer from "$lib/components/footer.svelte";
  import Container from "$lib/components/container.svelte";
  import Header from "./header.svelte";
	import Slider from "./slider.svelte";
  import Text from './text/index.svelte'

	let { data }: { data: { 
    work: Work
    content: string 
  } } = $props();

</script>

<Header data={data} />
<main>
  <Container>
    <div class="container">
      <Slider images={data.work.images} />
      <Text data={data} />
    </div>
  </Container>
</main>
<Footer />

<style>

  main{
    .container{
      @media screen and (min-width: 1024px) {
        display: grid;
        gap: 1rem;
        grid-template-columns: 60% 40%;
      }
    }

    margin-bottom: 4rem;
  }
</style>