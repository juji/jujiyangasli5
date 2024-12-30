import type { ScrollWheelHijacker } from "$lib/modules/scrollwheel-hijacker"
import type { FpsMonitorListenerParams } from "./fps-monitor"

type GlobalState = {
  viewTransitionDelay: number
  waitForAssets: null | Promise<null|void>
  loading: boolean
  fromWork?: string | null
  scrollWheelHijacker?: ScrollWheelHijacker | null
  lastFps: FpsMonitorListenerParams | null
  fpsEvent: EventTarget
}


export const globalState: GlobalState = $state({
  viewTransitionDelay: 0,
  waitForAssets: null,
  loading: false,
  fromWork: null,
  scrollWheelHijacker: null,
  fpsEvent: new EventTarget(),
  lastFps: null
})