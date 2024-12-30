<script lang="ts">

  import type { Work } from "$lib/data/works/types";
  import Container from "$lib/components/container.svelte";
  import Header from "./header.svelte";
	import Slider from "./slider.svelte";
  import Text from './text/index.svelte'

	let { data, onBackButton }: { 
    data: { 
      work: Work
      content: string 
    },
    onBackButton: (work: Work) => void
  } = $props();

</script>

<Header data={data} onBackButton={onBackButton} />
<div style={`--gradient:${data.work.gradientColor}`} class="gradient"></div>
<main>
  <Container>
    <div class="container">
      <Slider 
        id={data.work.id} 
        images={data.work.images} 
        color={data.work.gradientColor}
      />
      <Text data={data} />
    </div>
  </Container>
</main>

<style>

  .gradient{
    --gradient: hsl(0 0% 0% / 1);
    position: fixed;
    top: -0%;
    left: -0%;
    width: 100%;
    height: 100svh;

    @media screen and (min-width: 1024px){
      background: radial-gradient(
        ellipse at 0% 0%, 
        var(--gradient) 10%, 
        hsl(0 0% 0% / 1) 30%
      );
    }
  }

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