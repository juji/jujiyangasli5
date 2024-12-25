import { instance } from "three/tsl"

export type ScrollParams = {
  index: number
  end?: boolean
  start?: boolean
}

export type DimensionMarkers = {
  maxWidth?: number
  minWidth?: number
  maxHeight?: number
  minHeight?: number
  container?: HTMLElement
}

export enum LoggerType {
  INIT = 'INIT',
  START = 'START',
  STOP = 'STOP',
  PREV = 'PREV',
  NEXT = 'NEXT',
  RUN = 'RUN',
  DESTROY = 'DESTROY',
  SCROLL = 'SCROLL'
}

class Logger {
  settings: boolean | LoggerType[] | LoggerType = false 

  constructor(settings: boolean | LoggerType[] | LoggerType | '*'){
    if(settings === '*'){
      this.settings = [
        LoggerType.INIT,
        LoggerType.START,
        LoggerType.STOP,
        LoggerType.PREV,
        LoggerType.NEXT,
        LoggerType.RUN,
        LoggerType.DESTROY,
        LoggerType.SCROLL,
      ]
    }else{
      this.settings = settings
    }
  }

  log(
    type: string,
    ...par: unknown[]
  ){
    if(!this.settings) return;
    if(this.settings instanceof Array && !this.settings.includes(type as LoggerType)) return;
    if(this.settings instanceof String && this.settings !== type) return;
    console.log.call(this, `[${type}]`, ...par)
  }
}

export class MySlider {

  #elm: HTMLElement
  #interval: number = 5000
  #resizeObserver: ResizeObserver
  #dimensionResizeObserver: ResizeObserver | null = null

  #settimout: number = 0
  #scrollIndex: number = 0
  #stopped: boolean = false

  #dimensionMarkers: DimensionMarkers | null = null
  #windowLength = 0
  
  #logger: Logger

  onBeforeScroll: ((par: ScrollParams) => void) | null = null
  onAfterScroll: ((par: ScrollParams) => void) | null = null

  constructor(par: {
    elm: HTMLElement
    interval: number
    onBeforeScroll?: (par: ScrollParams) => void
    onAfterScroll?: (par: ScrollParams) => void
    dimensionMarkers?: DimensionMarkers
    _log?: boolean | LoggerType[] | LoggerType | '*'
  }){

    this.#elm = par.elm
    this.#interval = par.interval
    this.onBeforeScroll = par.onBeforeScroll ? par.onBeforeScroll : null
    this.onAfterScroll = par.onAfterScroll ? par.onAfterScroll : null
    this.#dimensionMarkers = par.dimensionMarkers ? par.dimensionMarkers : null


    this.#logger = new Logger(par._log || false)

    // check stop marker validity
    if(
      this.#dimensionMarkers &&
      typeof this.#dimensionMarkers.maxHeight !== 'number' && 
      typeof this.#dimensionMarkers.minHeight !== 'number' && 
      typeof this.#dimensionMarkers.maxWidth !== 'number' && 
      typeof this.#dimensionMarkers.minWidth !== 'number'
    ){
      throw new Error(
        '[MySlider.dimensionMarkers] needs a number for at least one of: maxHeight, minHeight, maxWidth, minWidth'
      )
    }

    // on resize
    this.#windowLength = Math.ceil( this.#elm.scrollWidth / this.#elm.clientWidth )
    this.#resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        entry.target.scrollTo({
          left: this.#scrollIndex * entry.target.clientWidth,
          top: 0,
          behavior: 'instant'
        })
        this.#windowLength = Math.ceil( this.#elm.scrollWidth / this.#elm.clientWidth )
        if(this.#scrollIndex > (this.#windowLength - 1)) this.#scrollIndex = this.#windowLength - 1
        this.#OAS()
      }
    })

    this.#resizeObserver.observe(this.#elm)

    // stop marker
    if(this.#dimensionMarkers){
      this.#dimensionResizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {

          if(!this.#dimensionMarkers) return;
          
          if(typeof this.#dimensionMarkers.minWidth === 'number'){
            if(entry.target.clientWidth >= this.#dimensionMarkers.minWidth)
              this.start()
            else this.stop()
          }
          
          if(typeof this.#dimensionMarkers.maxWidth === 'number'){
            if(entry.target.clientWidth <= this.#dimensionMarkers.maxWidth)
              this.start()
            else this.stop()
          }
          
          if(typeof this.#dimensionMarkers.minHeight === 'number'){
            if(entry.target.clientHeight >= this.#dimensionMarkers.minHeight)
              this.start()
            else this.stop()
          }
          
          if(typeof this.#dimensionMarkers.maxHeight === 'number'){
            if(entry.target.clientHeight <= this.#dimensionMarkers.maxHeight)
              this.start()
            else this.stop()
          }
          
        }
      })

      this.#dimensionResizeObserver.observe(
        this.#dimensionMarkers.container || document.body
      )
    }

    // safari, when are you going to add scroll end?
    let scrollEndTO: ReturnType<typeof setTimeout> | null = null;
    this.#elm.addEventListener('scroll',() => {
      if(scrollEndTO) clearTimeout(scrollEndTO)
      scrollEndTO = setTimeout(() => {
        if(!this.#elm.scrollLeft){
          this.#scrollIndex = 0  
        }else{
          this.#scrollIndex = Math.round(this.#elm.scrollLeft / this.#elm.clientWidth)
        }
        this.#OAS()
      },100)
    })
    
    // touch
    let touchendTO: ReturnType<typeof setTimeout> | null = null;
    this.#elm.addEventListener('touchstart',() => {
      this.pause()
    },{ passive: true })

    this.#elm.addEventListener('touchend',() => {
      if(touchendTO) clearTimeout(touchendTO)
      touchendTO = setTimeout(() => {
        this.start()
      })
    })

    this.#logger.log(LoggerType.INIT, par)

    // should run?
    if(this.#dimensionMarkers){
      const container = this.#dimensionMarkers.container || document.body
      if(
        typeof this.#dimensionMarkers.minWidth === 'number' &&
        container.clientWidth >= this.#dimensionMarkers.minWidth
      ) this.run()
      
      else if(
        typeof this.#dimensionMarkers.maxWidth === 'number' &&
        container.clientWidth <= this.#dimensionMarkers.maxWidth
      ) this.run()
      
      else if(
        typeof this.#dimensionMarkers.minHeight === 'number' &&
        container.clientHeight >= this.#dimensionMarkers.minHeight
      ) this.run()
      
      else if(
        typeof this.#dimensionMarkers.maxHeight === 'number' &&
        container.clientHeight <= this.#dimensionMarkers.maxHeight
      ) this.run()
    }else{
      this.run()
    }

  }

  #OBS( scroll: -1 | 1 ){
    const params = this.#onScroll( scroll, 'before' )
    this.onBeforeScroll && this.onBeforeScroll(params)
    return params
  }

  #OAS(){
    const params = this.#onScroll( 0, 'after' )
    this.onAfterScroll && this.onAfterScroll(params)
    return params
  }

  #onScroll(
    scroll: -1 | 0 | 1,
    timing: 'before' | 'after'
  ){

    let index = this.#scrollIndex + scroll
    
    if( // on last
      index >= this.#windowLength
    ) { 
      index = 0 
    }

    const params = { 
      index, 
      end: index === (this.#windowLength - 1), 
      start: !index
    }

    this.#logger.log(LoggerType.SCROLL, { ...params, timing })
    return params

  }

  start(){
    this.#logger.log(LoggerType.START, new Date())
    this.#stopped = false
    this.run()
  }

  resume(){
    this.start()
  }

  stop(){
    this.#logger.log(LoggerType.STOP, new Date())
    this.#stopped = true
    clearTimeout(this.#settimout)
  }

  pause(){
    this.stop()
  }

  prev(){
    
    this.#logger.log(LoggerType.PREV, 'START', {
      scrollLeft: this.#elm.scrollLeft,
      currentScroll: this.#scrollIndex
    })
 
    clearTimeout(this.#settimout)
    this.#stopped = true

    const { index } = this.#OBS( -1 )
    this.#elm.scrollTo(index * this.#elm.clientWidth, 0)
    this.#scrollIndex = index

    this.#logger.log(LoggerType.PREV, 'END', {
      scrollLeft: this.#elm.scrollLeft,
      currentScroll: this.#scrollIndex
    })

    this.#stopped = false
    this.run()
  }

  next(){

    this.#logger.log(LoggerType.NEXT, 'START', {
      scrollLeft: this.#elm.scrollLeft,
      currentScroll: this.#scrollIndex
    })

    clearTimeout(this.#settimout)
    this.#stopped = true

    const { index } = this.#OBS( 1 )
    this.#elm.scrollTo(index * this.#elm.clientWidth, 0)
    this.#scrollIndex = index

    this.#logger.log(LoggerType.NEXT, 'END', {
      scrollLeft: this.#elm.scrollLeft,
      currentScroll: this.#scrollIndex
    })

    this.#stopped = false
    this.run()
  }

  run(){

    this.#logger.log(LoggerType.RUN, 'START', {
      scrollLeft: this.#elm.scrollLeft,
      currentScroll: this.#scrollIndex
    })
    
    clearTimeout(this.#settimout)
    this.#settimout = setTimeout(() => {

      if(this.#stopped) return;

      const { index } = this.#OBS( 1 )
      this.#elm.scrollTo(index * this.#elm.clientWidth, 0)
      this.#scrollIndex = index

      this.run()

    }, this.#interval)

  }

  destroy(){

    this.#logger.log(LoggerType.DESTROY, 'DESTROY')
    
    this.stop()
    this.#resizeObserver.disconnect()
    if(this.#dimensionResizeObserver) this.#dimensionResizeObserver.disconnect()

  }

}

