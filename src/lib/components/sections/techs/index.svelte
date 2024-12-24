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

  let colors = [
    [119, 0, 117],
    [0, 49, 184],
    [39, 82, 0],
    [120, 0, 0],
    [116, 74, 7],
    [106, 97, 0]
  ]

  // so random will actualy get edges value
  // not so keen of having to write a big array
  colors = [ ...colors, ...colors, ...colors ] 

  function setColor(){
    const index = Math.floor(Math.random() * colors.length)
    elm.style.setProperty(
      '--tech-color', 
      `rgb(${colors[ index ].join(' ')})`
    )
  }

</script>


<section class="container" class:js id="techs" bind:this={elm}>
  <h2 class="section-title">
    Techs
  </h2>
  <p>Things i've used in my work,</p><p>Still learning bunch of stuff</p><br />
  <div class="grid" onmouseenter={setColor} role="complementary">
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

    --c: rgb(119, 0, 117);
    --c: rgb(0, 49, 184);
    --c: rgb(39, 82, 0);
    --c: rgb(120, 0, 0);
    --c: rgb(116, 74, 7);
    --c: rgb(106, 97, 0);

    --tech-color: rgb(119, 0, 117); /* i currently like this purple */
    margin-bottom: 8rem;

    .grid{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
      /* grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr)); */
      gap: 3px;

      .item{
        aspect-ratio: 1;
        border: 1px solid var(--border-color);
        position: relative;
        background: rgb( from var(--tech-color) r g b / 0);
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
          padding: 1.2rem;
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
          border: 1px solid hsl(from var(--tech-color) h s calc(l * 2));
          background: var(--tech-color);
          img{
            scale: 1.1;
          }
        }
      }
    }
  }
</style>