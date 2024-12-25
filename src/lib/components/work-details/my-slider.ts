

export class MySlider {

  elm: HTMLElement
  interval: number = 5000
  resizeObserver: ResizeObserver

  settimout: number = 0
  currentScroll: number = 0
  stopped: boolean = false

  onBeforeScroll: ((par:{
    num: number
    end?: boolean
    start?: boolean
  }) => void) | null = null

  constructor(par: {
    elm: HTMLElement,
    interval: number,
    onBeforeScroll?: (par:{
      num: number
      end?: boolean
      start?: boolean
    }) => void
  }){

    this.elm = par.elm
    this.interval = par.interval
    this.onBeforeScroll = par.onBeforeScroll ? par.onBeforeScroll : null

    // on resize
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        entry.target.scrollTo({
          left: this.currentScroll * entry.target.clientWidth,
          top: 0,
          behavior: 'instant'
        })
      }
    })

    this.resizeObserver.observe(this.elm)
    
    // touch
    let touchendTO: ReturnType<typeof setTimeout> | null = null;
    this.elm.addEventListener('touchstart',() => {
      this.pause()
    },{ passive: true })

    this.elm.addEventListener('touchend',() => {
      if(touchendTO) clearTimeout(touchendTO)
      touchendTO = setTimeout(() => {
        if(!this.elm.scrollLeft){
          this.currentScroll = 0  
        }else{
          this.currentScroll = Math.round(this.elm.scrollLeft / this.elm.clientWidth)
        }
        this.start()
      },1000)
    })

    this.run()

  }

  start(){
    this.stopped = false
    this.run()
  }

  resume(){
    this.stopped = false
    this.run()
  }

  stop(){
    this.stopped = true
    clearTimeout(this.settimout)
  }

  pause(){
    this.stopped = true
    clearTimeout(this.settimout)
  }

  prev(){
    clearTimeout(this.settimout)
    this.stopped = true
    this.elm.scrollBy(-this.elm.clientWidth, 0)
    this.currentScroll--;
    this.stopped = false
    this.run()
  }

  next(){
    clearTimeout(this.settimout)
    this.stopped = true
    this.elm.scrollBy(this.elm.clientWidth, 0)
    this.currentScroll++;
    this.stopped = false
    this.run()
  }

  run(){
    
    clearTimeout(this.settimout)
    this.settimout = setTimeout(() => {

      if(this.stopped) return;

      if((this.elm.scrollWidth - this.elm.clientWidth) === this.elm.scrollLeft){
        // start
        if(this.onBeforeScroll) this.onBeforeScroll({
          num: 0,
          start: true
        })
        
        this.elm.scrollTo(0, 0)
        this.currentScroll = 0
      }else{

        // last
        let end = false
        if(
          this.onBeforeScroll &&
          (this.elm.scrollLeft + this.elm.clientWidth) >= 
          (this.elm.scrollWidth - this.elm.clientWidth)
        ) end = true

        this.onBeforeScroll && this.onBeforeScroll({
          num: this.currentScroll+1, 
          end
        })

        this.elm.scrollBy(this.elm.clientWidth, 0)
        this.currentScroll++;
      }

      this.run()

    }, this.interval)

  }

  destroy(){
    this.stop()
    this.resizeObserver.disconnect()
  }

}

