<script lang="ts">

  import type { Work } from "$lib/data/works/types";

  /** @type {{ data: import('./$types').PageData }} */
	let { data }: { data: { work: Work } } = $props();

  function onBackButton(ev: MouseEvent){
    ev.preventDefault()
    history.back()
  }

</script>

<div>
<pre>
  <a onclick={onBackButton} href={`/#${data.work.id}`}>back</a>
  {JSON.stringify(data, null, 2)}
</pre>
</div>

<style>

</style>