type GlobalState = {
  viewTransitionDelay: number
  waitForAssets: null | Promise<null|void>
  loading: boolean
}


export const globalState: GlobalState = $state({
  viewTransitionDelay: 0,
  waitForAssets: null,
  loading: false
})