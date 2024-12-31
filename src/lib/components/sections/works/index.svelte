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
            `rotateX(-50deg) scale(0.8)`, 
            `rotateX(0deg) scale(1)`, 
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
          transform: [ `scale(1)`, `scale(0.8)`,]
        }, { ease: 'easeOut' }
      ]
    ] : [
      [
        worksContainer,{
          transform: [ 
            `translateY(150px)`, 
            `translateY(0px)`,
          ]
        }, { ease: 'linear' }
      ]
    ]

    const offset = innerWidth >= 800 ? [ 0, .3, .7 ] : [ 0, 0.2 ]
    
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
    />{/each}
  </div>
</section>

<style>

  section{
    perspective: 1000px;
  }

  .works{
    display: grid;

    grid-template-columns: 1fr;
    grid-gap: 0.1rem;
    margin-bottom: 4rem;

    @media screen and (min-width: 800px) {
      grid-template-columns: 1fr 1fr;
    }

  }
</style>