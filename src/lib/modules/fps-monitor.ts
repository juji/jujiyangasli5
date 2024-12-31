
export type FpsMonitorResult = {
  avgFps: number,
  goodFps: number,
  isGoodFps: boolean
}

export type FpsMonitorParams = {
  onBeforeCount?: (() => void) | null
  onAfterCount?: (par: FpsMonitorResult) => void
  repaintIntervalNum?: number
  goodFps?: number
  debounce?: number
}

// simple observer, by chat gpt
class Observer<T> {
  private observers: Array<(data: T) => void> = []; 
  subscribe(observer: (data: T) => void): void {
    this.observers.push(observer);
  }
  unsubscribe(observer: (data: T) => void): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  destroy(){
    this.observers = []
  }
  notify(data: T): void {
    this.observers.forEach(observer => observer(data));
  }
}


export class FpsMonitor {

  static #goodFps = 60
  static #repaintIntervalNum = 5
  static #debounce = 300
  static #beforeObserver = new Observer<boolean>()
  static #afterObserver = new Observer<FpsMonitorResult>()
  static #i = 0

  static start(par?: FpsMonitorParams){

    const {
      onBeforeCount,
      onAfterCount,
      goodFps,
      repaintIntervalNum,
      debounce
    } = par || {}

    if(onBeforeCount) this.#beforeObserver.subscribe(onBeforeCount)
    if(onAfterCount) this.#afterObserver.subscribe(onAfterCount)
    if(goodFps) this.#goodFps = goodFps
    if(repaintIntervalNum) this.#repaintIntervalNum = repaintIntervalNum
    if(debounce) this.#debounce = debounce
    
    // start first
    this.#onResize()
    window.addEventListener('resize', this.#onResize)

  }

  static onBeforeCount(fn: () => void){
    this.#beforeObserver.subscribe(fn)
  }

  static removeOnBeforeCount(fn: () => void){
    this.#beforeObserver.unsubscribe(fn)
  }

  static onAfterCount(fn: (data: FpsMonitorResult) => void){
    this.#afterObserver.subscribe(fn)
  }

  static removeOnAfterCount(fn: (data: FpsMonitorResult) => void){
    this.#afterObserver.unsubscribe(fn)
  }

  static destroy(){
    window.removeEventListener('resize', this.#onResize)
    this.#afterObserver.destroy()
    this.#beforeObserver.destroy()
  }

  static setGoodFps(n: number){
    this.#goodFps = n
  }

  static setRepaintIntervalNum(n: number){
    this.#repaintIntervalNum = n
  }

  static setDebounce(n: number){
    this.#debounce = n
  }

  static #onResize(){
    if(this.#i) clearTimeout(this.#i)
    this.#i = setTimeout(async () => {
      this.#i = 0
      this.#beforeObserver.notify(true)
      const fps = await this.#checkFps()
      this.#afterObserver.notify(fps)
    }, this.#debounce)
  }

  // https://stackoverflow.com/a/66167211/1058374
  static #getRepaintInterval(){
    const p: Promise<number> = new Promise((resolve) => {
      requestAnimationFrame((t1) => {
        requestAnimationFrame((t2) => {
          resolve(t2 - t1);
        });
      });
    })
    return p
  };

  // get average repaint interval
  static async #avgRepaintInterval(){
    let num = 0
    for(let i = 0; i<this.#repaintIntervalNum; i++ )
      num += await this.#getRepaintInterval()
    return num / this.#repaintIntervalNum
  }

  static async #checkFps(){

    const avgFps = 1000 / await this.#avgRepaintInterval()

    return {
      avgFps,
      goodFps: this.#goodFps,
      isGoodFps: avgFps >= this.#goodFps
    }

  }


}

