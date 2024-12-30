<script lang="ts">

  let loading = $state(false)
  let end = $state(false)

  let { isLoading } = $props()

  $effect(() => {
    if(end) setTimeout(() => {
      loading = false
      end = false
    },1000)
  })

  $effect(() => {
    if(isLoading && !loading){
      loading = true
    }

    if(!isLoading && loading){
      end = true
    }
  })

</script>


<div 
  class="loading-indicator"
  class:loading
  class:end
></div>

<style>

  @keyframes gradient { 
    0%   { background-position: 0 0; }
    100% { background-position: -200% 0; }
  }

  .loading-indicator{

    position: fixed;
    top:0;
    left:0;
    width: 100%;
    z-index: 1000;
    opacity: 0;
    transition: opacity 200ms ease-out;

    &::after{
      content: ' ';
      position: fixed;
      top:0;
      left: 50%;
      width: 100%;
      height: 2px;
      background: rgb(0, 196, 95);
      background: radial-gradient(circle, rgb(76, 255, 130) 0%, rgb(0, 163, 122) 37%);
      z-index: 1000;
      background-size: 200% auto;
      background-position: 0 100%;
      animation: gradient 500ms infinite forwards linear;
      transform: scaleX(0%);
      translate: -50% 0;
      transition: transform 500ms ease-out;
    }

    &.loading{
      opacity: 1;
      &::after{
        transform: scaleX(80%);
      }
    }

    &.end{
      &::after{
        transform: scaleX(100%);
      }
    }

  }
</style>