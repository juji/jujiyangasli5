

type ScrollToTopParams = {
  elm?: HTMLElement | Window
  rootMarginTopPercent?: number
}


// This class
// will force the browser to scroll to top
// when condition met

export class ScrollToTop {

  elm: HTMLElement | Window

  scrollListener: ( e: Event ) => void
  touchListener: ( e: TouchEvent ) => void
  // lastPos: null | number = null
  direction: null | -1 | 1 = null
  
  scrolled = false
  scrollTimeout = 0
  observer: IntersectionObserver
  rootMarginTopPercent: number

  touched: boolean = false
  handleTouch: boolean = false
  raf: number = 0

  scrollSpeed: number = 0
  lastScrollY: number = 0
  lastScrollTime: number = Date.now()

  constructor( par? : ScrollToTopParams ){
    
    const {
      elm = window,
      rootMarginTopPercent = 45
    } = par || {}

    // this should have relative position
    this.elm = elm
    this.rootMarginTopPercent = rootMarginTopPercent

    // append child to top
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

    // intersection observer
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          this.isIntersecting()
        }
      });
    };

    this.observer = new IntersectionObserver(callback, {
      root: this.elm === window ? document : this.elm as HTMLElement,
      rootMargin: `${this.rootMarginTopPercent}% 0% 0% 0%`
    });

    this.observer.observe(div)

    // scroll listener
    this.scrollListener = (e: Event) => {

      // another gpt created code {
        const currentScrollY = window.scrollY; // Current scroll position
        const currentTime = Date.now(); // Current timestamp

        // Calculate time and distance deltas
        const deltaY = currentScrollY - this.lastScrollY;
        const deltaTime = currentTime - this.lastScrollTime;

        if (deltaTime > 0) {
          this.scrollSpeed = deltaY / deltaTime; // Calculate momentum (speed)
        }

        // Update the last values
        this.lastScrollY = currentScrollY;
        this.lastScrollTime = currentTime;
      // }
      
      this.direction = deltaY < 0 ? -1 : 1

      // handle
      if(
        this.handleTouch &&
        this.touched && 
        this.direction === -1 &&
        this.scrollSpeed > -1 &&
        window.scrollY > 1
      ){
        this.touched = false
        this.handleTouch = false
        this.elm.scrollTo({
          top: -333,
          left: 0,
          behavior: 'smooth'
        })
      }

    }

    this.touchListener = (e:TouchEvent) => {
      this.touched = true
    }

    window.addEventListener('touchstart', this.touchListener,{ passive: true })
    window.addEventListener('scroll', this.scrollListener,{ passive: true })

  }

  isIntersecting(){
    if(this.direction !== -1) return;
    this.handleTouch = true
    document.dispatchEvent(new CustomEvent('_ScrollToTop_'))
  }

  destroy(){
    window.removeEventListener('touchstart', this.touchListener)
    window.removeEventListener('scroll', this.scrollListener)
    this.observer.disconnect()
  }

}