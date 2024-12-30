

type ScrollToTopParams = {
  elm?: HTMLElement | Window
}


export class ScrollToTop {

  elm: HTMLElement | Window

  scrollListener: ( e: Event ) => void
  lastPos: null | number = null
  direction: null | -1 | 1 = null
  
  scrolled = false
  scrollTimeout = 0

  constructor( par? : ScrollToTopParams ){
    
    const {
      elm = window
    } = par || {}

    this.elm = elm

    this.scrollListener = (e: Event) => {

      if(this.lastPos !== null){
        const delta = window.scrollY - this.lastPos 
        this.direction = delta < 0 ? -1 : 1
      }

      this.lastPos = window.scrollY
      if(this.scrollTimeout) clearTimeout(this.scrollTimeout)
      this.scrollTimeout = setTimeout(() => {
        this.scrolled = true
        this.onEnd()
        this.scrollTimeout = 0
      },100)

    }

    this.start()

  }

  onEnd(){

    if(!this.scrolled) return;
    this.scrolled = false

    if(
      window.scrollY < (window.innerHeight / 2) && 
      this.direction === -1
    ){
      this.elm.scrollTo({
        top: -333,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  start(){
    window.addEventListener('scroll', this.scrollListener)
  }

  destroy(){
    window.removeEventListener('scroll', this.scrollListener)
  }

}