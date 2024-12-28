<script lang="ts">
  import Logo from './logo.svelte'
  import { sectionInView } from '$lib/functions/section-in-view';
	import { animate, scroll } from 'motion';

  let elm: HTMLElement
  let hi: HTMLElement
  let menu: HTMLElement

  $effect(() => { 
    const stop = sectionInView( elm ) 

    const hiCancel = scroll(animate(
      hi,
      {
        transform: [ 
          `translateY(0px)`, 
          `translateY(15lvh)`, 
        ]
      }, { ease: 'linear' }
    ),{
      target: elm,
      offset: [ 0, `100vh` ]
    })

    const menuCancel = scroll(animate(
      menu,
      {
        transform: [ 
          `translateY(0px)`, 
          `translateY(28lvh)`, 
        ]
      }, { ease: 'linear' }
    ),{
      target: elm,
      offset: [ 0, `100vh` ]
    })

    return () => {
      stop()
      hiCancel()
      menuCancel()
    }
  })

</script>

<div class="hero" id="home" bind:this={elm}>
  <header>
    <Logo />
  </header>
  <p class="webdev" bind:this={hi}>Hi, I'm a web&nbsp;developer</p>
  <div class="menu-bottom" bind:this={menu}>
    <a class="link" style="--delay:0ms" href="#works">Works</a>
    <a class="link" style="--delay:50ms" href="#play">Play</a>
    <a class="link" style="--delay:100ms" href="#techs">Techs</a>
    <a class="link" style="--delay:150ms" href="#contact">Contact</a>
    <a class="link outgoing" style="--delay:200ms" href="https://blog.jujiyangasli.com" target="_blank">Blog</a>
  </div>
</div>

<style>
  @keyframes webdev {
    0% {
      opacity: 0;
      translate: 21px 0;
    }
    100% {
      opacity: 1;
      translate: 0px 0;
    }
  }

  .hero{

    height: 100vh;

    header{

      padding: 1rem 0;
      display: flex;
      justify-content: space-between;

    }

    p.webdev{
      font-size: 1.3rem;
      font-weight: 600;
      animation-name: webdev;
      animation-duration: 200ms;
      animation-fill-mode: both;
      animation-timing-function: ease-out;
      animation-delay: 500ms;
      text-shadow: var(--text-shadow);
      line-height: 2.3rem;
      margin-bottom: 1rem;
    }

    .menu-bottom{
      display: inline-grid;
      gap: 1rem;

      grid-template-columns: auto auto;
      grid-template-rows: auto auto auto;
      margin-top: 1rem;
      
      @media screen and (min-width: 382px) {
        grid-template-columns: auto auto auto auto auto;
        grid-template-rows: auto;
        margin-top: 0rem;
      }

      a.link{
        --delay: 0ms;
        animation-name: webdev;
        animation-duration: 200ms;
        animation-fill-mode: both;
        animation-timing-function: ease-out;
        animation-delay: calc(700ms + var(--delay));
        text-shadow: var(--text-shadow);
        font-weight: 600;
      }
    }

  }
</style>