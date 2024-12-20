<script lang="ts">
	import type { TechItem } from '$lib/data/techs/types';
  import { sectionInView } from '$lib/functions/section-in-view';

  let { techs } : { techs: TechItem[][] } = $props()
  let elm: HTMLElement
  let js = $state(false)
  $effect(() => { 
    sectionInView( elm ) 
    js = true
  })

  const colors = [
    [119, 0, 117],
    [0, 49, 184],
    [0, 76, 37],
    [39, 82, 0],
    [39, 82, 0],
    [42, 42, 42],
    [55, 55, 55],
  ]

  function setColor(){
    const index = Math.floor(Math.random() * colors.length)
    console.log(colors[ index ])
    elm.style.setProperty(
      '--tech-color', 
      colors[ index ].join(' ')
    )
  }

</script>


<section class="container" class:js id="techs" bind:this={elm}>
  <h2 class="section-title">
    Techs
  </h2>
  <p>Things i've worked with</p><br /><br />
  <div class="grid" onmouseenter={setColor} role="table">
    {#each techs as techrow}
    {#each techrow as item}
      <div class="item">
        <img src={item.image} alt={item.title} loading="lazy" />
        <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.title}></a>
      </div>
    {/each}
    {/each}
  </div>
</section>

<style>
  .container{

    --tech-color: 196 229 56;
    margin-bottom: 8rem;

    .grid{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
      gap: 3px;

      .item{
        aspect-ratio: 1;
        border: 1px solid #353535;
        position: relative;
        background: rgb(var(--tech-color) / 0);
        border-radius: 3px;
        transition: 
          background 1000ms 500ms,
          border 2000ms 500ms
        ;

        img{
          display: block;
          width: 100%;
          height: 100%;
          object-position: center center;
          object-fit: contain;
          padding: 2rem;
          scale: 1;
          transition: scale 300ms;
        }

        a{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        &:hover{
          transition: 
            background 0ms,
            border 0ms
          ;
          border: 1px solid hsl(from rgb(var(--tech-color)) h s calc(l * 2));
          background: rgb(var(--tech-color));
          img{
            scale: 1.1;
          }
        }
      }
    }
  }
</style>