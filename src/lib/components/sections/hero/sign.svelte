<script lang="ts">
	import { globalState } from "$lib/modules/global.svelte";

  let to = 0
  $effect(() => {
    if(!globalState.heroAnimationMessage) return;
    if(to) clearTimeout(to)
    to = setTimeout(() => {
      globalState.heroAnimationMessage = ''
    },3000)
  })

</script>

<div class="sign">
  {#if globalState.heroAnimationMessage}
  <span>{globalState.heroAnimationMessage}</span>
  {/if}
</div>

<style>
  .sign{
    
    display: block;
    margin-top: 2rem;
    
    span{
      font-size: 0.9rem;
      color: black;
      background-color: #1fc31f;
      padding: 0.5rem 1rem;
    }

  }
</style>