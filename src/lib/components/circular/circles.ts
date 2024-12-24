
import { Anim } from "../anim";



export class Circles extends Anim {

  num = Math.max(1000,Math.max(window.innerWidth, window.innerHeight))
  sal = 7
  
  renderer:Worker
  calculator:Worker
  paused = false
  onReady: () => void

  calculatorReady = false
  rendererReady = false
  ready = false

  radiusXMultiplier = 0.6
  radiusYMultiplier = 0.6
  positionYMultiplier = 0.2
  speedMultiplier = 0.005
  canvas: HTMLCanvasElement

  constructor(
    canvas: HTMLCanvasElement, 
    onReady: () => void
  ){

    super()

    this.onReady = onReady

    this.renderer = new Worker(new URL('./renderer', import.meta.url), { type: 'module' })
    this.calculator = new Worker(new URL('./calculator', import.meta.url), { type: 'module' })

    const sab = new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * this.num * this.sal);
    const sharedArray = new Float32Array(sab)
    
    let wMax = Math.max(window.innerWidth, window.innerHeight)
    let n = this.num
    while(n--){

      // x
      sharedArray[ n * this.sal + 0 ] = 0
      // y
      sharedArray[ n * this.sal + 1 ] = 0
      // radiusX
      sharedArray[ n * this.sal + 2 ] = Math.random() * wMax * this.radiusXMultiplier
      // radiusY
      sharedArray[ n * this.sal + 3 ] = sharedArray[ n * this.sal + 2 ] * this.radiusYMultiplier
      // radians
      sharedArray[ n * this.sal + 4 ] = Math.random() * Math.PI * 2
      // translateY
      sharedArray[ n * this.sal + 5 ] = Math.random() * (Math.random() ? -1 : 1) * this.positionYMultiplier
      // speed
      sharedArray[ n * this.sal + 6 ] = Math.random() * this.speedMultiplier

    }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.setProperty('width', window.innerWidth+'px')
    canvas.style.setProperty('height', window.innerHeight+'px')
    const offscreen = canvas.transferControlToOffscreen()

    this.renderer.postMessage({
      num: this.num,
      canvas: offscreen,
      sharedBuffer: sab,
      dataLength: this.sal,
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio
    },[ offscreen ])

    this.calculator.postMessage({
      num: this.num,
      sharedBuffer: sab,
      dataLength: this.sal,
    })

    this.canvas = canvas
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

    window.addEventListener('touchstart', (init: TouchEvent) => {
      if(this.paused) return;

      let pointerDownTime = performance.now()
      this.calculator.postMessage({ pause: true, pointerX: init.touches[0].clientX })

      const initY = init.touches[0].clientY
      const initX = init.touches[0].clientX

      const onPointerMove = (e: TouchEvent) => {
        if(
          // ignore vertical swipe
          Math.abs(e.touches[0].clientY - initY) > Math.abs(e.touches[0].clientX - initX)
        )
          return;

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

    if(this.canvas.width === window.innerHeight){
      // if rotated
      this.canvas.style.setProperty('height', window.innerHeight+'px')
      this.canvas.style.setProperty('width', window.innerWidth+'px')
    }else{
      // else, just do the width
      this.canvas.style.setProperty('width', window.innerWidth+'px')
    }

    this.renderer.postMessage({
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: Math.max(2, window.devicePixelRatio)
    })
  }

}


