import type { ScrollWheelHijacker } from "$lib/modules/scrollwheel-hijacker"
import { FpsMonitor as FPSMon, type FpsMonitor } from "./fps-monitor"

type GlobalState = {
  viewTransitionDelay: number
  waitForAssets: null | Promise<null|void>
  loading: boolean
  fromWork?: string | null
  scrollWheelHijacker?: ScrollWheelHijacker | null
}


export const globalState: GlobalState = $state({
  viewTransitionDelay: 0,
  waitForAssets: null,
  loading: false,
  fromWork: null,
  scrollWheelHijacker: null,
})