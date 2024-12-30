
export type FpsMonitorListenerParams = {
  avgInterval: number
  goodInterval: number
  isGoodInterval: boolean
}

export type FpsMonitorParams = {
  onChange: (par: FpsMonitorListenerParams) => void
  repaintIntervalNum?: number
  goodInterval?: number
}



export class FpsMonitor {

  onChange: (par: FpsMonitorListenerParams) => void
  #onResize: () => void
  #lastWindowWidth: number | null = null
  #lastWindowHeight: number | null = null
  #goodInterval = 1000 / 60
  #repaintIntervalNum = 5

  constructor(par: FpsMonitorParams){

    const {
      onChange,
      goodInterval = 1000 / 60,
      repaintIntervalNum = 5
    } = par

    this.onChange = onChange
    this.#lastWindowHeight = window.innerHeight
    this.#lastWindowWidth = window.innerWidth
    this.#goodInterval = goodInterval
    this.#repaintIntervalNum = repaintIntervalNum

    // when changing monitor
    // width and height is the same
    // but on resize event triggers
    this.#onResize = async () => {
      if(
        window.innerHeight === this.#lastWindowHeight &&
        window.innerWidth === this.#lastWindowWidth
      ) {
        const fps = await this.#checkFps()
        this.onChange(fps)
      }
      this.#lastWindowHeight = window.innerHeight
      this.#lastWindowWidth = window.innerWidth
    }

    this.#start()

  }

  destroy(){
    window.removeEventListener('resize', this.#onResize)
  }

  setGoodInterval(n: number){
    this.#goodInterval = n
  }

  setRepaintIntervalNum(n: number){
    this.#repaintIntervalNum = n
  }

  #start(){
    window.addEventListener('resize', this.#onResize)

    // start first
    this.#onResize()
  }


  // https://stackoverflow.com/a/66167211/1058374
  #getRepaintInterval(){
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
  async #avgRepaintInterval(){
    let num = 0
    for(let i = 0; i<this.#repaintIntervalNum; i++ )
      num += await this.#getRepaintInterval()
    return num / this.#repaintIntervalNum
  }

  async #checkFps(){

    const avgInterval = await this.#avgRepaintInterval()

    return {
      avgInterval,
      goodInterval: this.#goodInterval,
      isGoodInterval: avgInterval <= this.#goodInterval
    }

  }


}

