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
    [119, 0, 117], // purple
    [0, 49, 184], // blue
    [39, 82, 0], // green
    [120, 0, 0], // red
    [116, 74, 7], // orange
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
  <p>Things i've worked with,</p><p>Yet still learning to this day</p><br />
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

    --tech-color: rgb(119, 0, 117); /* i currently like this purple */
    margin-bottom: 8rem;

    .grid{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
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