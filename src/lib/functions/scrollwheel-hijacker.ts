
type ScrollWheelHijackerParams = {
  ease?: number
  minimumDelta?: number
  elm?: HTMLElement | Window
  disableOnSmoothSroll?: boolean
  showWarning?: boolean
}

export class ScrollWheelHijacker {

  smooth = true
  elm: HTMLElement | Window
  deltaY = 0
  scrolling = false
  listener: (e: WheelEvent) => void
  listening = false
  ease = 0.05
  minimumDelta = 0.1
  rafId: number = 0
  onMouseWheel: (() => void) | null = null

  constructor( par? : ScrollWheelHijackerParams ){

    const {
      ease = null,
      minimumDelta = null,
      elm = window,
      disableOnSmoothSroll = true,
      showWarning = false
    } = par || {}

    if(
      minimumDelta !== null &&
      !(minimumDelta > 0 && minimumDelta <= 1)
    ) throw new Error('ScrollWheelHijacker ERROR: minimumDelta should be (0, 1]')

    if(
      ease !== null &&
      !(ease > 0 && ease <= 1)
    ) throw new Error('ScrollWheelHijacker ERROR: ease should be (0, 1]')

    this.elm = elm
    this.minimumDelta = minimumDelta !== null ? minimumDelta : this.minimumDelta
    this.ease = ease !== null ? ease : this.ease

    this.listener = (e: WheelEvent) => {

      // smooth scrolling detected
      // no need for this
      if(Math.abs(e.deltaY) < 2 && !this.listening && disableOnSmoothSroll) {

        if(showWarning)
          console.warn('ScrollWheelHijacker: smooth scrolling detected, will now quit')

        // @ts-expect-error
        this.elm.removeEventListener('wheel', this.listener)
        
        return;
      }
      
      this.listening = true
      e.preventDefault()
      this.deltaY += e.deltaY
      if(!this.scrolling) this.scroll()
    }

    // @ts-expect-error
    this.elm.addEventListener('wheel',this.listener,{ passive: false })

  }

  scroll(){
    this.scrolling = true
    
    const scrollBy = () => {

      let delta = 0

      // make things round
      if(Math.abs(this.deltaY) <= this.minimumDelta) {

        delta = this.minimumDelta * Math.abs(this.deltaY) / this.deltaY
        this.deltaY = 0

      }else{

        delta = this.deltaY * this.ease
        this.deltaY -= delta

      }

      this.elm.scrollBy({
        top: delta,
        left: 0,
        behavior: 'instant'
      })
      
      if(this.deltaY) {
        this.rafId = requestAnimationFrame(scrollBy)
      } else { this.scrolling = false }

    }

    this.rafId = requestAnimationFrame(scrollBy)

  }

  destroy(){
    if(this.rafId) cancelAnimationFrame(this.rafId)

    // @ts-expect-error
    this.elm.removeEventListener('wheel',this.listener)
  }

}