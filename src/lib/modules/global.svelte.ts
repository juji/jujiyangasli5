type GlobalState = {
  viewTransitionDelay: number
  waitForAssets: null | Promise<null|void>
  loading: boolean
  fromWork?: string | null
}


export const globalState: GlobalState = $state({
  viewTransitionDelay: 0,
  waitForAssets: null,
  loading: false,
  fromWork: null
})