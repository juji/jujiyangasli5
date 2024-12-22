<script>
  import '$lib/styles/rubbery.css'
</script>

<span class="a">&nbsp;}</span><span class="s">;</span>

<style>

  span{
    text-shadow: var(--text-shadow);
  }

  @keyframes anim {
    0%{
      scale: 1 0 1;
    }
    100%{
      scale: 1 1 1;
    }
  }

  span.a{
    animation-delay: 1000ms;
    animation-name: anim;
    animation-duration: 1000ms;
    animation-fill-mode: both;
    animation-timing-function: var(--rubbery);
  }

  span.s{
    animation-delay: 1100ms;
    animation-name: anim;
    animation-duration: 1000ms;
    animation-fill-mode: both;
    animation-timing-function: var(--rubbery);
  }

</style>