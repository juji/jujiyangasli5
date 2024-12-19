<script lang="ts">
  import IntersectionObserver from "svelte-intersection-observer";

  let isIntersecting = $state(false);
  let { children, id, element, intersecting = $bindable()  } = $props();

  $effect(() => {
    const menu = document.querySelector(`#menuTop a[href="#${id}"]`) as HTMLAnchorElement
    intersecting = isIntersecting
    if(isIntersecting){
      menu.classList.add('active')
    }else{
      menu.classList.remove('active')
    }
  })

</script>

<IntersectionObserver {element} bind:intersecting={isIntersecting} rootMargin="-1px 0px -1px 0px">
  {@render children()}
</IntersectionObserver>