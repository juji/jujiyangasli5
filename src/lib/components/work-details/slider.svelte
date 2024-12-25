

<script lang="ts">
  import type { WorkImage } from "$lib/data/works/types";
  import PhotoSwipeLightbox from 'photoswipe/lightbox';
  import 'photoswipe/style.css';

  import { MySlider, type ScrollParams } from './my-slider'

  const { images, id, color }: {
    images: WorkImage[]
    id: string
    color: string
  } = $props()

  let container: HTMLElement
  let mySlider: MySlider
  let arrowLeft: HTMLElement
  let arrowRight: HTMLElement

  function onBeforeScroll({
    start, end
  }: ScrollParams){
    if(start) arrowLeft.classList.add('hidden')
    else arrowLeft.classList.remove('hidden')
    if(end) arrowRight.classList.add('hidden')
    else arrowRight.classList.remove('hidden')
  }

  $effect(() => {

    const lightbox = new PhotoSwipeLightbox({
      gallery: '#my-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();

    mySlider = new MySlider({
      // _log: '*',
      elm: container,
      interval: 5000,
      onBeforeScroll: onBeforeScroll,
      onAfterScroll: onBeforeScroll,
      dimensionMarkers: {
        maxWidth: 1024
      }
    })

    lightbox.on('beforeOpen', () => {
      mySlider.pause()
    });

    lightbox.on('close', () => {
      mySlider.start()
    });

    return () => {
      lightbox.destroy()
      mySlider.destroy()
    }

  })


</script>

<div class="slider-container" style={`--color:${color}`}>
  <button aria-label="previous image" bind:this={arrowLeft} 
    onclick={() => mySlider.prev()} class="arrow left hidden">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
        fill="currentColor"
      />
    </svg>
  </button>
  <button aria-label="next image" bind:this={arrowRight} 
    onclick={() => mySlider.next()} class="arrow right">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
        fill="currentColor"
      />
    </svg>
  </button>
  <div class="container" id="my-gallery" data-fancybox={1} bind:this={container}>
    {#each images as image, index }
      <a
        href={image.url}
        data-pswp-width={image.dimension.image.width}
        data-pswp-height={image.dimension.image.height}
        target="_blank"
      >
        <picture>
          <source media="(max-width: 767px)" 
            srcset={image.thumbnail} 
            width={image.dimension.thumb.width}
            height={image.dimension.thumb.height}
          />
          <source media="(min-width: 768px)" 
            srcset={image.url} 
            width={image.dimension.image.width}
            height={image.dimension.image.height}
          />
          <img 
            src={image.url} 
            data-index={index}
            alt={image.title} 
            loading={index === 0 ? null : "lazy"}
            style={index === 0 ? `view-transition-name: ${id}` : ''}
          />
        </picture>
      </a>
    {/each}
  </div>
</div>

<style>

  :global(.pswp__icn-shadow){
    /* stroke: #8c8c8c; */
    stroke: transparent;
  }

  :global(.pswp__icn){
    fill: #adadad;
  }

  :global(.pswp__container){
    transition: transform 700ms ease-out;
    @media screen and (hover: none){
      transition: initial;
    }
  }

  .slider-container{

    --color: rgb(255 255 255 / 1);
    position: relative;

    .arrow{
      position: absolute;
      top: 50%;
      left: calc(-1 * var(--page-padding));
      transform: translateY(-50%);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(from var(--color) r g b / 0.9);
      border: 0px;
      padding: 0.5rem 0;
      border: 1px solid hsla(from var(--color) h s calc(l + 15) / 1);
      cursor: pointer;

      @media screen and (hover: none) {
        display: none;
      }
      
      &.left{
        border-top-right-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        padding-left: 0; 
        transition: padding-left 200ms ease-out;
        border-left: 0px;
        &:hover{
          padding-left: 1rem;
        }
      }

      &.right{
        left: unset;
        right: calc(-1 * var(--page-padding));
        border-top-left-radius: 0.2rem;
        border-bottom-left-radius: 0.2rem;
        padding-right: 0; 
        transition: padding-right 200ms ease-out;
        border-right: 0px;
        &:hover{
          padding-right: 1rem;
        }
      }

      svg{
        position: relative;
        left: -2px;
      }

      &:hover{
        background-color: hsla(from var(--color) h s calc(l + 10) / 1);
      }

      &:active{
        background-color: hsla(from var(--color) h s calc(l + 20) / 1);
      }

      :global(&.hidden){
        display: none;
      }

      @media screen and (min-width: 1024px) {
        display: none;
      }
    }
  }

  .container{

    position: relative;
    left: calc(-1 * var(--page-padding));
    width: calc(100% + var(--page-padding) + var(--page-padding));

    display: flex;
    aspect-ratio: 16 / 9;
    
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    
    scrollbar-width: none;
    scroll-behavior: smooth;

    user-select: none;
    overscroll-behavior: none; 
    -webkit-user-select: none; 
    -webkit-touch-callout: none; 

    a{
      margin: 0;
      padding: 0;
      border: none;
      aspect-ratio: 16 / 9;
      height: 100%;
      width: auto;
      display: block;
      scroll-snap-align: start;
    }

    img{
      aspect-ratio: 16 / 9;
      height: 100%;
      width: auto;
      display: block;
      object-fit: cover;
      object-position: center top;
      padding: 0 1px;
    }

    @media screen and (min-width: 768px) {
      aspect-ratio: 32 / 9;
    }

    @media screen and (min-width: 1024px) {
      display: block;
      aspect-ratio: unset;
      overflow-x: hidden;
      overflow-y: auto;
      left: 0;
      width: 100%;

      a{
        margin-bottom: 1rem;
      }

      a, img{
        height: auto;
        aspect-ratio: unset;
      }
    }

  }
</style>