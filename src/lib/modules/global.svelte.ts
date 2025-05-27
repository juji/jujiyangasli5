import type { ScrollWheelHijacker } from "$lib/modules/scrollwheel-hijacker"
import type { FpsMonitor } from '$lib/modules/fps-monitor';

type GlobalState = {
  viewTransitionDelay: number
  waitForAssets: null | Promise<null|void>
  loading: boolean
  fromWork?: string | null
  scrollWheelHijacker?: ScrollWheelHijacker | null
  fpsMeter?: FpsMonitor | null
  showFps?: boolean
}


export const globalState: GlobalState = $state({
  viewTransitionDelay: 0,
  waitForAssets: null,
  loading: false,
  fromWork: null,
  scrollWheelHijacker: null,
  fpsMeter: null,
  showFps: false
})