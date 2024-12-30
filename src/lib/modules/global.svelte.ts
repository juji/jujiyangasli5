import type { ScrollWheelHijacker } from "$lib/functions/scrollwheel-hijacker"


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
  scrollWheelHijacker: null
})