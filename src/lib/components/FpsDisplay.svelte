<script lang="ts">
  import { onMount } from 'svelte';
  import { globalState } from '$lib/modules/global.svelte';
  import { FpsMonitor } from '$lib/modules/fps-monitor';
  import type { FpsMonitorResult } from '$lib/modules/fps-monitor';

  let fps = 0;
  let isActive = false;

  onMount(() => {
    const fpsMeter = globalState.fpsMeter;
    if (!fpsMeter) return;

    isActive = true;

    const updateFps = (result: FpsMonitorResult) => {
      fps = Math.round(result.avgFps);
    };

    FpsMonitor.onAfterCount(updateFps);

    return () => {
      FpsMonitor.removeOnAfterCount(updateFps);
    };
  });
</script>

{#if isActive && globalState.showFps}
  <div
    style="position: fixed; bottom: 10px; right: 10px; background-color: rgba(0,0,0,0.5); color: white; padding: 5px 10px; border-radius: 3px; font-family: monospace; z-index: 9999;"
  >
    FPS: {fps}
  </div>
{/if}
