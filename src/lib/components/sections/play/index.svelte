<script lang="ts">
	import type { Play } from '$lib/data/play/types';
  import { sectionInView } from '$lib/modules/section-in-view';
	import { animate, stagger, inView } from 'motion';

  let { play } : { play: Play[] } = $props()
  let elm: HTMLElement
  $effect(() => { 
    const stop = sectionInView( elm ) 
    return () => stop()
  })

  let grid: HTMLElement;
  let innerWidth = $state(0)

  // this is making my stomach feel bad
  // in phone, seems to be okay
  // only do this for width < 768
  $effect(() => {

    if(innerWidth >= 768){
      return;
    }

    const opt = { 
      type: "spring", 
      stiffness: 1494,
      damping: 31,
      mass: 2.9,
      delay: stagger(0.1) 
    }
  
    const stop = inView(grid, () => {
  
      animate(
        '.playitem', 
        // @ts-ignore
        { transform: `scale(1)` }, 
        opt
      )
  
      return () => {
        animate(
          '.playitem', 
          // @ts-ignore
          { transform: `scale(.9)` }, 
          opt
        )
      }
    },{
      margin: '5000px 0px -50px 0px'
    })
  
    return () => {
      stop()
    }
  }) 


</script>

<svelte:window bind:innerWidth={innerWidth}></svelte:window>

<section class="container" id="play" bind:this={elm}>
  <h2 class="section-title funny">Play</h2>
  <p class="border"></p>
  <p>
    Things learned, 
    or just playing around: 
    <a target="_blank" 
      rel="noreferrer nofollower"
      class="outgoing" 
      href="https://jujiplay.com">https://jujiplay.com</a>
  </p>
  <br /><br />
  <div class="grid" bind:this={grid}>
    {#each play as item}
      <div class="item playitem">
        <img src={item.image} 
          alt={item.title} 
          width={item.width} 
          height={item.height} 
          loading="lazy" />
        <p>{item.title}</p>
        <a 
          aria-label={item.title}
          href={item.url} 
          target="_blank" 
          rel="noreferrer noopenner"></a>
      </div>
    {/each}
  </div>
</section>

<style>

  @keyframes h2{
    0%{
      translate: 0 0px 0;
      scale: 1 1 1;
    }

    12.6%{
      translate: 0 10px 0;
      scale: 1 .78 1;
      rotate: 0deg;
    }

    17%{
      translate: 0 0px 0;
      scale: 1 1 1;
      rotate: 0.7deg;
    }

    22.2%{
      translate: 0 -42px 0;
      scale: 1.03 1 1;
      rotate: 3deg;
    }

    28%{
      translate: 0 -48px 0;
      scale: 1.04 1.2 1;
      rotate: 1deg;
    }

    35.8%{
      translate: 0 0px 0;
      scale: 1 1 1;
      rotate: -1deg;
    }

    40.3%{
      translate: 0 8px 0;
      scale: 1 .85 1;
      rotate: 1deg;
    }

    50%{
      translate: 0 0px 0;
      scale: 1 1 1;
      rotate: 0deg;
    }
  }

  .container{
    margin-bottom: 4rem;

    h2{
      display: inline-block;
      animation: h2 3500ms ease-in infinite both;
      padding-bottom: 0;
    }

    .border{
      border-top: 1px solid #868686;
      padding-bottom: 1rem;
      width: 67px;
      position: relative;
      top: -21px;
    }

    .grid{
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(1, 1fr);
      @media screen and (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
      }

      
      .item{
        
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background-color: black;
        position: relative;
        outline: 2px solid #333333;
        border-radius: 5px;
        transform: scale(.9);

        p{
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 1;
          padding: 5px 8px;
        }

        a{
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        img{
          display: block;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center center;
          scale: 1.3; /*  to make the image in frame when bouncing, we use 1.3 */
          transition: scale 2000ms var(--rubbery);
        }
        
        &:hover, &:focus, &:has(a:focus){
          outline: 2px solid var(--active-link-color);
          img{
            scale: 1.9;
          }
        }

        &:active{
          outline: 2px solid var(--link-color);
          img{
            scale: 1.3;
          }
        }


      }

    }
  }
</style>