
export class HijackScrollWheel {

  smooth = true
  elm: Window
  deltaY = 0
  scrolling = false
  listener: (e: WheelEvent) => void
  listening = false
  lerp = 0.05
  minimumDelta = 1
  rafId: number = 0
  onMouseWheel: (() => void) | null = null;

  constructor(){

    this.elm = window

    this.listener = (e: WheelEvent) => {

      // smooth scrolling detected
      // no need for this
      if(Math.abs(e.deltaY) < 2 && !this.listening) {
        window.removeEventListener('wheel', this.listener)
        return;
      }
      
      this.listening = true
      e.preventDefault()
      this.deltaY += e.deltaY
      if(!this.scrolling) this.scroll()
    }

    window.addEventListener('wheel',this.listener,{ passive: false })

  }

  scroll(){
    this.scrolling = true
    
    const scrollBy = () => {

      let delta = 0

      // make things round
      if(Math.abs(this.deltaY) < this.minimumDelta) {
        delta = this.minimumDelta * Math.abs(this.deltaY) / this.deltaY
        this.deltaY = 0
      }else{
        delta = this.deltaY * this.lerp
        this.deltaY -= delta
      }

      this.elm.scrollBy({
        top: delta,
        left: 0,
        behavior: 'instant'
      })
      
      if(this.deltaY) {
        this.rafId = requestAnimationFrame(scrollBy)
      }
      else { this.scrolling = false }

    }

    this.rafId = requestAnimationFrame(scrollBy)

  }

  destroy(){
    if(this.rafId) cancelAnimationFrame(this.rafId)
    window.removeEventListener('wheel',this.listener)
  }

}