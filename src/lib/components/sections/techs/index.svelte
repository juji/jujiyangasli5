<script lang="ts">
	import type { TechItem } from '$lib/data/techs/types';
  import { sectionInView } from '$lib/modules/section-in-view';
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

  $effect(() => {
    
    const stop = inView('.grid',( info ) => {
      info.target.classList.add('visible')
      return () => {
        info.target.classList.remove('visible')
      }
    },{
      margin: '999% 0% 0% 0%',
      amount: 'some'
    })

    return () => {
      stop()
    }
  })

  // svelte-ignore (non_reactive_update)
  let animDelay = 0

</script>


<section class="container" id="techs" bind:this={elm}>
  <h2 class="section-title">
    Techs
  </h2>
  <p>Things i've used in my work,</p><p>Still learning bunch of stuff</p><br />
  <div class="grid" class:js role="complementary">
    {#each techs as techrow}
    {#each techrow as item}
      <div class="item-container">
        <div class="item" style={`--in-delay:${animDelay++}`}>
          <img src={item.image} alt={item.title} loading="lazy" />
          <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.title}></a>
        </div>
      </div>
    {/each}
    {/each}
  </div>
</section>

<style>
  .container{

    margin-bottom: 8rem;
    
    .grid{
      display: grid;
      
      /* https://css-tricks.com/a-responsive-grid-layout-with-no-media-queries/ */
      grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
      
      gap: 3px;
      
      
      --delay-mult: 90ms;
      
      .item-container{
        perspective: 500px;
        transform-style: preserve-3d;
      }


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
        opacity: 1;
        transform: rotateY(0deg);
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

      &.js{
        .item{
          opacity: 0;
          transform: rotateY(45deg);
        }

        a{
          transform: translateX(-200%);
        }
      }

      &:global(.visible){
        .item{
          transition: 
            transform 400ms ease-out calc(var(--in-delay) * var(--delay-mult)),
            opacity 200ms ease-out calc(var(--in-delay) * var(--delay-mult)),
            background 1000ms 500ms,
            border 2000ms 500ms
          ;
          transform: rotateY(0deg);
          opacity: 1;

          a{
            transition: transform 400ms ease-out calc(var(--in-delay) * var(--delay-mult));
            transform: translateX(0%);
          }

          @media screen and (hover: none) {

            --delay-mult: 40ms;

            transition: 
              transform 200ms ease-out calc(var(--in-delay) * var(--delay-mult)),
              opacity 200ms ease-out calc(var(--in-delay) * var(--delay-mult)),
              background 1000ms 500ms,
              border 2000ms 500ms
            ;

            a{
              transition: transform 800ms ease-out calc(var(--in-delay) * var(--delay-mult));
            }
          }

        }
      }

      .item:hover, .item:has(a:focus) {
        transition: 
          transform 200ms ease-out,
          opacity 200ms ease-out calc(var(--in-delay) * var(--delay-mult)),
          background 0ms,
          border 0ms
        ;

        border: 1px solid hsl(from var(--background-color) h s calc(l + 42));

        img{
          scale: 1;
        }
      }

      .item:has(a:focus){
        outline: 1px solid var(--active-link-color);
      }

    }
  }
</style>