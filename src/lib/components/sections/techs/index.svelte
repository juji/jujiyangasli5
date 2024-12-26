<script lang="ts">
	import type { TechItem } from '$lib/data/techs/types';
  import { sectionInView } from '$lib/functions/section-in-view';
	import { inView } from 'motion';

  let { techs } : { techs: TechItem[][] } = $props()
  let elm: HTMLElement
  let js = $state(false)
  $effect(() => { 
    const stop = sectionInView( elm ) 
    js = true
    return () => {
      stop()
    }
  })

  let colors = [
    [119, 0, 117],
    [0, 49, 184],
    [39, 82, 0],
    [120, 0, 0],
    [116, 74, 7],
    [106, 97, 0]
  ]

  // so random will actualy get value on the edges
  // not so keen of having to write a big array
  colors = [ ...colors, ...colors, ...colors ] 

  function setColor(){
    const index = Math.floor(Math.random() * colors.length)
    elm.style.setProperty(
      '--tech-color', 
      `rgb(${colors[ index ].join(' ')})`
    )
  }

  $effect(() => {
    
    const stop = inView('.grid',( info ) => {
      info.target.classList.add('visible')
      return () => {
        info.target.classList.remove('visible')
      }
    },{
      margin: '999% 0% -10% 0%',
      amount: 'some'
    })


    return () => {
      stop()
    }
  })

  // svelte-ignore (non_reactive_update)
  let animDelay = 0

</script>


<section class="container" class:js id="techs" bind:this={elm}>
  <h2 class="section-title">
    Techs
  </h2>
  <p>Things i've used in my work,</p><p>Still learning bunch of stuff</p><br />
  <div class="grid" onmouseenter={setColor} role="complementary">
    {#each techs as techrow}
    {#each techrow as item}
      <div class="item" style={`--in-delay:${animDelay++}`}>
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
    perspective: 1000px;

    .grid{
      display: grid;

      /* https://css-tricks.com/a-responsive-grid-layout-with-no-media-queries/ */
      grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));

      gap: 3px;
      transform-style: preserve-3d;

      --delay-mult: 80ms;


      .item{
        aspect-ratio: 1;
        border: 1px solid var(--border-color);
        position: relative;
        background: rgb( from var(--tech-color) r g b / 0);
        border-radius: 3px;
        transition: 
          transform 100ms ease-out,
          opacity 100ms ease-out,
          background 1000ms 500ms,
          border 2000ms 500ms
        ;
        opacity: 0;
        transform: rotateY(45deg);
        transform-origin: 0px;
        overflow: hidden;

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
          width: 350%;
          height: 100%;
          transform: translateX(-100%);
          background: linear-gradient(
            111deg, 
              rgb(0 0 0 / 0) 0%,
              rgb(0 0 0 / 0) 38%,
              rgb(255 255 255 / .3) 40%,
              rgb(255 255 255 / .3) 60%,
              rgb(0 0 0 / 0) 62%,
              rgb(0 0 0 / 0) 100%
          );
        }

      }

      &:global(.visible){
        .item{
          transition: 
            transform 700ms ease-out calc(var(--in-delay) * var(--delay-mult)),
            opacity 200ms ease-out calc(var(--in-delay) * var(--delay-mult)),
            background 1000ms 500ms,
            border 2000ms 500ms
          ;
          transform: rotateY(0deg);
          opacity: 1;

          a{
            transition: transform 500ms ease-out calc(var(--in-delay) * var(--delay-mult));
            transform: translateX(0%);  
          }

          @media screen and(hover: hover) {
            
            &:hover{
              transition: 
                transform 200ms ease-out,
                opacity 200ms ease-out calc(var(--in-delay) * var(--delay-mult)),
                background 0ms,
                border 0ms
              ;
  
              /* border: 1px solid hsl(from var(--tech-color) h s calc(l * 1.5)); */
              border: 1px solid hsl(from var(--background-color) h s calc(l + 34));
              /* background: var(--tech-color); */
  
              img{
                scale: 1;
              }
  
            }
          }

        }
      }
    }
  }
</style>