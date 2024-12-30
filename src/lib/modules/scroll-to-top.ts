

type ScrollToTopParams = {
  elm?: HTMLElement | Window
  rootMarginTopPercent?: number
  scrollToTopSpeedFactor?: number
  onScrollStart?: () => boolean
}


// This class
// will force the browser to scroll to top
// when condition met

export class ScrollToTop {

  elm: HTMLElement | Window

  scrollListener: ( e: Event ) => void
  direction: null | -1 | 1 = null
  
  scrolled = false
  scrollTimeout = 0
  observer: IntersectionObserver
  rootMarginTopPercent: number

  touched: boolean = false
  hasIntersected: boolean = false
  raf: number = 0

  scrollSpeed: number = 0
  lastScrollY: number = 0
  lastScrollTime: number = Date.now()

  onScrollStart: () => boolean

  observedElm: HTMLDivElement
  scrollToTopSpeedFactor: number

  constructor( par? : ScrollToTopParams ){
    
    const {
      elm = window,
      rootMarginTopPercent = 45,
      scrollToTopSpeedFactor = 1.05,
      onScrollStart = () => true,
    } = par || {}

    // this should have relative position
    this.elm = elm

    this.rootMarginTopPercent = rootMarginTopPercent
    this.onScrollStart = onScrollStart
    this.scrollToTopSpeedFactor = scrollToTopSpeedFactor

    // append child to top
    // this is the div that will trigger scroll
    // with intersection observer
    const div = document.createElement('div')
    div.style.setProperty('position', 'absolute')
    div.style.setProperty('width', '1px')
    div.style.setProperty('height', '1px')
    div.style.setProperty('top', '0px')
    div.style.setProperty('left', '0px')
    div.classList.add('scroll-to-top-div')

    if(this.elm === window){
      document.body.prepend(div)
    }else{
      (this.elm as HTMLElement).prepend(div)
    }

    this.observedElm = div

    // intersection observer
    //
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          this.isIntersecting()
        }else{
          this.hasIntersected = false
        }
      });
    };

    this.observer = new IntersectionObserver(callback, {
      root: this.elm === window ? document : this.elm as HTMLElement,
      rootMargin: `${this.rootMarginTopPercent}% 0% -1% 0%` // bottom: -1 to be safe
    });

    this.observer.observe(this.observedElm)

    // scroll listener
    //
    this.scrollListener = (e: Event) => {

      // another gpt created code {
        const currentScrollY = window.scrollY; // Current scroll position
        const currentTime = Date.now(); // Current timestamp

        // Calculate time and distance deltas
        const deltaY = currentScrollY - this.lastScrollY;
        const deltaTime = currentTime - this.lastScrollTime;

        if (deltaTime > 0) {
          this.scrollSpeed = deltaY / deltaTime; // Calculate speed
        }

        // Update the last values
        this.lastScrollY = currentScrollY;
        this.lastScrollTime = currentTime;
      // }
      
      this.direction = deltaY < 0 ? -1 : 1

      // handle scroll
      if(
        this.hasIntersected &&
        this.direction === -1 &&
        this.scrollSpeed > -1 &&
        window.scrollY < window.innerHeight &&
        window.scrollY > 1
      ){
        this.hasIntersected = false
        this.scrollTillZero(this.scrollSpeed)
      }

    }

    window.addEventListener('scroll', this.scrollListener,{ passive: true })

  }

  

  scrollTillZero(lastSpeed: number){

    const topPos = (this.elm as HTMLElement).scrollTop || (this.elm as Window).scrollY
    if(!topPos) {
      this.elm.scrollTo({
        top: -333,
        left: 0,
        behavior: 'smooth'
      })
      return;
    }

    // increasing speed
    const speed = lastSpeed * this.scrollToTopSpeedFactor
    this.elm.scrollBy({
      top: speed,
      left: 0,
      behavior: 'instant'
    })

    this.raf = requestAnimationFrame(() => {
      this.raf = 0
      this.scrollTillZero(speed)
    })
  }

  isIntersecting(){
    if(this.direction !== -1) return;

    // allowing others to take the scroll
    this.hasIntersected = this.onScrollStart()

  }

  destroy(){
    window.removeEventListener('scroll', this.scrollListener)
    this.observer.disconnect()
    if(this.raf) cancelAnimationFrame(this.raf)
    if(this.observedElm) this.observedElm.remove()
  }

}