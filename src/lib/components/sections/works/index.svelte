<script lang="ts">
	import { animate, scroll } from 'motion';
  import Thumbnail from './thumbnail.svelte';

  let elm: HTMLElement;

  let { 
    works, 
    setTransition,
    fadeOutDelay,
    fromWork
  } = $props();
  
  let fadeOut = $state(false)
  function onThumbnailClick(i: number){
    return function({ image }:{ image: string }){
      fadeOut = true
      setTransition(image)
    }
  }

  let innerWidth:number = $state(0)
  let worksContainer: HTMLDivElement;
  $effect(() => {

    const animation = innerWidth >= 800 ? [
      [
        worksContainer,
        {
          transform: [ 
            `rotateX(-50deg) scale(0.8) translateY(50px)`, 
            `rotateX(0deg) scale(1) translateY(0px)`, 
          ]
        }, { ease: 'easeOut' }
      ],
      [
        worksContainer,
        {
          transform: [ `scale(1)`, ]
        }, { ease: 'easeOut' }
      ],
      [
        worksContainer,
        {
          transform: [ `scale(1)`, `scale(0.9)`, `translateY(50px)`]
        }, { ease: 'easeOut' }
      ]
    ] : [
      [
        worksContainer,{
          transform: [ 
            `translateY(0px)`, 
            `translateY(0px)`,
          ]
        }, { ease: 'linear' }
      ]
    ]

    const offset = innerWidth >= 800 ? [ 0, .3, .7 ] : [ 0, 1 ]
    
    const animInCancel = scroll(
      // @ts-ignore
      animate(animation),
      { offset }
    )

    return () => {
      animInCancel()
    }
  })

</script>

<svelte:window bind:innerWidth={innerWidth}></svelte:window>

<section id="works" bind:this={elm}>
  <h2 class="section-title">Works</h2>
  <div class="works" bind:this={worksContainer}>
    {#each works as work, index}<Thumbnail 
      onThumbnailClick={onThumbnailClick(index)}
      fromWork={fromWork === work.id}
      fadeOutSpeed={fadeOutDelay}
      fadeOut={fadeOut}
      work={work} 
      index={index}
      indexLength={works.length}
    />{/each}
  </div>
</section>

<style>

  section{
    @media screen and (min-width: 800px) {
      perspective: 1000px;
    }
  }

  .works{
    perspective: 1000px;
    
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.1rem;
    margin-bottom: 4rem;

    @media screen and (min-width: 800px) {
      grid-template-columns: 1fr 1fr;
      perspective: unset;
    }

  }
</style>