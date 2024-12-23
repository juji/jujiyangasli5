
import { Anim } from "../anim";



export class Circles extends Anim {

  num = 1000
  sal = 7
  
  renderer:Worker
  calculator:Worker
  paused = false
  onReady: () => void

  calculatorReady = false
  rendererReady = false
  ready = false

  constructor(
    canvas: HTMLCanvasElement, 
    onReady: () => void
  ){

    super()

    this.onReady = onReady

    this.renderer = new Worker(new URL('./renderer', import.meta.url), { type: 'module' })
    this.calculator = new Worker(new URL('./calculator', import.meta.url), { type: 'module' })

    const sab = this.getInitialData()
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const offscreen = canvas.transferControlToOffscreen()

    this.renderer.postMessage({
      num: this.num,
      canvas: offscreen,
      sharedBuffer: sab,
      dataLength: this.sal,
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: Math.max(2, window.devicePixelRatio)
    },[ offscreen ])

    this.calculator.postMessage({
      num: this.num,
      sharedBuffer: sab,
      dataLength: this.sal,
    })

    this.listenEvents()

  }

  listenEvents(){

    this.calculator.onmessage = (e: MessageEvent) => {
      if(e.data.ready){
        this.calculatorReady = true
        if(this.rendererReady && !this.ready) {
          this.ready = true
          this.onReady()
        }
      }
    }

    this.renderer.onmessage = (e: MessageEvent) => {
      if(e.data.ready){
        this.rendererReady = true
        if(this.calculatorReady && !this.ready) {
          this.ready = true
          this.onReady()
        }
      }
    }

    window.addEventListener('resize', () => {
      this.resize()
    })

    window.addEventListener('mousedown', (e: MouseEvent) => {
      if(this.paused) return;

      let pointerDownTime = performance.now()
      this.calculator.postMessage({ pause: true, pointerX: e.x })

      const onPointerMove = (e: MouseEvent) => {
        this.calculator.postMessage({ pointerX: e.x })
      }

      const onPointerUp = (e: MouseEvent) => {
        pointerDownTime = performance.now() - pointerDownTime
        this.calculator.postMessage({ pointerDownTime, play: true })

        window.removeEventListener('mousemove', onPointerMove)
        window.removeEventListener('mouseup', onPointerUp)
      }

      window.addEventListener('mousemove', onPointerMove)
      window.addEventListener('mouseup', onPointerUp)

    })

    window.addEventListener('touchstart', (e: TouchEvent) => {
      if(this.paused) return;

      let pointerDownTime = performance.now()
      this.calculator.postMessage({ pause: true, pointerX: e.touches[0].clientX })

      const onPointerMove = (e: TouchEvent) => {
        this.calculator.postMessage({ pointerX: e.touches[0].clientX })
      }

      const onPointerUp = (e: TouchEvent) => {
        pointerDownTime = performance.now() - pointerDownTime
        this.calculator.postMessage({ pointerDownTime, play: true })

        window.removeEventListener('touchmove', onPointerMove)
        window.removeEventListener('touchend', onPointerUp)
        window.removeEventListener('touchcancel', onPointerUp)
      }

      window.addEventListener('touchmove', onPointerMove)
      window.addEventListener('touchend', onPointerUp)
      window.addEventListener('touchcancel', onPointerUp)

    })

  }

  getInitialData(){

    const sab = new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * this.num * this.sal);
    const sharedArray = new Float32Array(sab)
    
    let n = this.num
    while(n--){

      // x
      sharedArray[ n * this.sal + 0 ] = 0
      // y
      sharedArray[ n * this.sal + 1 ] = 0
      // radiusX
      sharedArray[ n * this.sal + 2 ] = Math.random() * (window.innerWidth * 0.8 )
      // radiusY
      sharedArray[ n * this.sal + 3 ] = 0.3 * sharedArray[ n * this.sal + 2 ]
      // radians
      sharedArray[ n * this.sal + 4 ] = Math.random() * Math.PI * 2
      // translateY
      sharedArray[ n * this.sal + 5 ] = Math.random() * (Math.random() ? -1 : 1)
      // speed
      sharedArray[ n * this.sal + 6 ] = Math.random() * 0.008

    }

    return sab
  }

  pause(){
    this.paused = true
    this.renderer.postMessage({ pause: true })
    this.calculator.postMessage({ pause: true })
  }

  play(){
    this.paused = false
    this.renderer.postMessage({ play: true })
    this.calculator.postMessage({ play: true })
  }

  resize(){
    this.renderer.postMessage({
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: Math.max(2, window.devicePixelRatio)
    })
  }

}


