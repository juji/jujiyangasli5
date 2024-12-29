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

{#if globalState.heroAnimationMessage}
  <br /><br />
  <div class="sign">{globalState.heroAnimationMessage}</div>
{/if}

<style>
  .sign{
    font-size: 0.9rem;

    background-color: #1fc31f;
    color: black;
    padding: 0.5rem 1rem;
    display: inline-block;
    margin-top: 1rem;

  }
</style>