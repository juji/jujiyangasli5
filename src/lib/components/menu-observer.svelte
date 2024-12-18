<script lang="ts">
  import IntersectionObserver from "svelte-intersection-observer";

  let intersecting = $state(false);
  let { children, id, element  } = $props();

  $effect(() => {
    const menu = document.querySelector(`#menuTop a[href="#${id}"]`) as HTMLAnchorElement
    if(intersecting){
      menu.classList.add('active')
    }else{
      menu.classList.remove('active')
    }
  })

</script>

<IntersectionObserver {element} bind:intersecting rootMargin="-1px 0px -1px 0px">
  {@render children()}
</IntersectionObserver>