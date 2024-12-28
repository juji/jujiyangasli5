

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

  :root{
    --lightbox-button-color: rgb(169, 169, 169);
  }

  :global(.pswp__icn){
    color: var(--lightbox-button-color);
    filter: 
      drop-shadow(0px 1px 1px rgb(0 0 0 / 0.6))
      drop-shadow(0px 0px 1px rgb(0 0 0 / 0.4))
      drop-shadow(1px 1px 1px rgb(0 0 0 / 0.2))
    ;

  }

  :global(.pswp__button--arrow){

    width: auto;
    height: auto;
    display: block;
    margin: 0;
    padding: 1rem 0;
    transform: translateY(-50%);
    background-color: rgb(50 50 50 / 0.8);
    border: 1px solid var(--lightbox-button-color);
    cursor: pointer;

    &:hover,
    &:focus,
    &:active{
      background-color: rgb(50 50 50 / 0.8);
      border: 1px solid var(--lightbox-button-color);
      cursor: pointer;
      padding: 1rem 0;
    }

    & :global(.pswp__icn){
      all: initial;
      cursor: pointer;
      display: block;
      width: 21px;
      height: 21px;
      color: var(--lightbox-button-color);
      fill: currentColor;
      transition: translate 200ms 100ms;

      @media screen and (min-width: 768px) {
        width: 34px;
        height: 34px;
      }
    }

    &:global(.pswp__button--arrow--prev){
      border-left: 0px solid var(--lightbox-button-color);
      border-top-right-radius: 0.3rem;
      border-bottom-right-radius: 0.3rem;
      transition: padding-left 100ms ease-out;
    }

    &:global(.pswp__button--arrow--next){
      border-right: 0px solid var(--lightbox-button-color);
      border-top-left-radius: 0.3rem;
      border-bottom-left-radius: 0.3rem;
      transition: padding-right 100ms ease-out;
      
      & :global(.pswp__icn){
        transform: scale(-1, 1);
        translate: -1px 0 0;
      }
    }

    &:hover{
      background-color: rgb(50 50 50 / 0.8);

      &:global(.pswp__button--arrow--prev){
        padding-left: .8rem;
        & :global(.pswp__icn){
          translate: 3px 0 0;
          filter: brightness(200%);
        }
      }

      &:global(.pswp__button--arrow--next){
        padding-right: .8rem;
        & :global(.pswp__icn){
          translate: -4px 0 0;
          filter: brightness(200%); 
        }
      }
    }

    &:active{
      background-color: rgb(80 80 80 / 0.9)
    }

    @media screen and (hover: none){
      display: none;
    }
  }

  :global(.pswp__icn-shadow){
    stroke: transparent;
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
    overflow: hidden;
    left: calc(-1 * var(--page-padding));
    width: calc(100% + var(--page-padding) + var(--page-padding));

    .arrow{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: hsla(from var(--color) h s calc(l + 10) / 0.9);
      padding: 0.5rem 0;
      border: 1px solid hsla(from var(--color) h s calc(l + 34) / 0.6);
      cursor: pointer;
      translate: 0 0 0;

      box-shadow:
        0px 0px 0.4px rgba(0, 0, 0, 0.41),
        0px 0px 1.1px rgba(0, 0, 0, 0.24),
        0px 0px 2.7px rgba(0, 0, 0, 0.203),
        0px 0px 9px rgba(0, 0, 0, 0.179)
      ;

      @media screen and (hover: none) {
        display: none;
      }
      
      &.left{
        border-top-right-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        left: 0;
        padding-left: 0; 
        border-left: 0px;
        transition: 
          translate 200ms,
          padding-left 200ms ease-out;

        &:hover{
          padding-left: 1rem;
        }

        :global(&.hidden){
          pointer-events: none;
          translate: -100% 0 0;
        }

      }

      &.right{
        right: 0;
        border-top-left-radius: 0.2rem;
        border-bottom-left-radius: 0.2rem;
        padding-right: 0; 
        transition: 
          translate 200ms,
          padding-right 200ms ease-out;
        border-right: 0px;

        &:hover{
          padding-right: 1rem;
        }

        :global(&.hidden){
          pointer-events: none;
          translate: 100% 0 0;
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
        filter: brightness(80%);
      }

      @media screen and (min-width: 1024px) {
        display: none;
      }
    }

    @media screen and (min-width: 1024px) {
      left: 0;
      width: 100%;
    }
  }

  .container{

    position: relative;
    width: auto;

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
    &::-webkit-scrollbar {
      display: none;
    }

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