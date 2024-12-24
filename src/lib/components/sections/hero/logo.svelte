<script>
  import Smiley from './smiley.svelte'
</script>

<h1><a href="/">
  <span class="j0">j</span><span 
  class="u">u</span><span 
  class="j1">j</span><span 
  class="i">i</span><Smiley />
</a></h1>

<style>

  @keyframes logo {
    0%{
      transform: scaleY(0) scaleX(0) translateX(-34px);
    }

    100%{
      transform: scaleY(1) scaleX(1) translateX(0px);
    }
  }

  h1{
    font-family: 'Grandstander';
    font-size: 3rem;
    margin-left: 13px;
    position: relative;
    text-rendering: geometricPrecision;
    font-synthesis: none;

    @media screen and (min-width: 380px) {
      font-size: 5rem;
    }

    @media screen and (min-width: 500px) {
      font-size: 7rem;
    }

    a{
      text-decoration: none;
      color: var(--text-color);
      display: flex;
      justify-items: flex-start;
    }



    span{
      --anim-gap: 120ms;
      animation-name: logo;
      animation-duration: 1000ms;
      animation-fill-mode: both;
      animation-timing-function: var(--rubbery);

      
      &.j0{
        animation-delay: calc(1 * var(--anim-gap));
      }

      &.u{
        animation-delay: calc(1.6 * var(--anim-gap));
      }

      &.j1{
        animation-delay: calc(2.4 * var(--anim-gap));
      }

      &.i{
        animation-delay: calc(3.5 * var(--anim-gap));
      }

      text-shadow: var(--text-shadow);

    }
    
    


  }
</style>