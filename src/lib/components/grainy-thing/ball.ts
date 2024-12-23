import { frame, cancelFrame } from "motion"

const colors = [
  [196, 229, 56], // '#C4E538',
  [18, 203, 196], // '#12CBC4',
  [237, 76, 103], // '#ED4C67',
  [163, 203, 56], // '#A3CB38',
  [238, 90, 36], // '#EE5A24',
  [0, 148, 50], // '#009432',
  [234, 32, 39], // '#EA2027',
  [6, 82, 221], // '#0652DD',
  [217, 128, 250], // '#D980FA',
  [153, 128, 250], // '#9980FA',
]

function randomColor(){
  return colors[Math.floor(Math.random() * colors.length)].join(',');
}

export class Ball {

  elm: HTMLDivElement
  radius = 0
  diameter = 0
  x = 0
  y = 0
  color = ''
  speedX = 0
  speedY = 0
  accelX = 0
  accelY = 0

  leftBorder = 0
  topBorder = 0
  rightBorder = 0
  bottomBorder = 0

  // blur = 0
  maxSpeed = 2
  accelDelta = 0.05
  // state = {}

  baseSpeed = 1

  runFunc = {
    update: () => {},
    render: () => {}
  }

  constructor(
    elm: HTMLDivElement,
    smallScreen: boolean
  ){

    this.elm = elm

    let smaller = Math.min(1080, Math.min(window.innerHeight, window.innerWidth))
    this.radius = Math.round((smaller * 0.5) + (Math.random() * 100))

    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * window.innerHeight
    this.color = randomColor()

    this.speedX = this.baseSpeed + Math.random() * (Math.random() < .5 ? 1 : -1)
    this.speedY = this.baseSpeed + Math.random() * (Math.random() < .5 ? 1 : -1)

    this.leftBorder = smallScreen ? window.innerWidth * 0.1 : this.radius * Math.random()
    this.topBorder = smallScreen ? window.innerHeight * 0.5 : this.radius * Math.random()
    this.rightBorder = smallScreen ? window.innerWidth - (window.innerWidth * 0.1) : window.innerWidth - (this.radius * Math.random())
    this.bottomBorder = smallScreen ? window.innerHeight - (window.innerHeight * 0.4) : window.innerHeight - (this.radius * Math.random())

    this.elm.style.setProperty('--diameter', (this.radius * 2) + 'px')
    this.elm.style.setProperty('--color', this.color)
    this.elm.style.setProperty('--pos-x', this.x + 'px')
    this.elm.style.setProperty('--pos-y', this.y + 'px')

    // do i want to save the state?
    // this.state = JSON.parse(JSON.stringify(this))

  }

  onResize(){
    this.rightBorder = window.innerWidth - (this.radius * Math.random())
    this.bottomBorder = window.innerHeight - (this.radius * Math.random())
  }

  start(){
    this.runFunc.render = () => { this.render() }
    this.runFunc.update = () => { this.update() }
    frame.update(this.runFunc.update, true)
    frame.render(this.runFunc.render, true)
  }

  stop(){
    cancelFrame(this.runFunc.update)
    cancelFrame(this.runFunc.render)
  }

  update(){
    if(this.x > this.rightBorder){
      this.accelX -= this.accelDelta
    }

    if(this.x < this.leftBorder){
      this.accelX += this.accelDelta
    }

    if(this.y > this.bottomBorder){
      this.accelY -= this.accelDelta
    }

    if(this.y < this.topBorder){
      this.accelY += this.accelDelta
    }

    this.x += Math.max(
      Math.min(this.speedX + this.accelX, this.maxSpeed), 
      -this.maxSpeed
    )
    
    this.y += Math.max(
      Math.min(this.speedY + this.accelY, this.maxSpeed), 
      -this.maxSpeed
    )
  }

  render(){
    this.elm.style.setProperty('--pos-x', this.x + 'px')
    this.elm.style.setProperty('--pos-y', this.y + 'px')
  }

}
