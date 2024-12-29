<script lang="ts">
  // import { fade } from 'svelte/transition';

  let { content = '' } = $props()

  let to = 0
  $effect(() => {
    if(!content) return;
    if(to) clearTimeout(to)
    to = setTimeout(() => {
      content = ''
    },3000)
  })

</script>

{#if content}
  <div class="sign">
    <span>{content}</span>
  </div>
{/if}

<style>
  .sign{
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    opacity: 1;
    z-index: 0;
    font-size: 0.9rem;
    transition: 
      opacity 500ms ease-out
    ;

    span{
      background-color: #1fc31f;
      color: black;
      padding: 0.5rem 1rem;
      display: inline-block;
    }

  }
</style>