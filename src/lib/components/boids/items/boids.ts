import * as THREE from 'three';
import BoidBox from './boidBox';

export default class Boids {

  boidColor = 0xFFD700
  boidSize = 21

  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  geometry: THREE.BufferGeometry
  position: THREE.Float32BufferAttribute

  counterIndex = 0
  boidBox: BoidBox

  offscreen = false


  constructor(obj: {
    canvas: HTMLCanvasElement | OffscreenCanvas,
    boundingBox: { width:number, height: number },
    boidBox: BoidBox,
    initialPos: number[],
    devicePixelRatio: number,
    customShaderMaterial?: THREE.ShaderMaterial
    geometryAttribute?: { [key:string]: THREE.BufferAttribute | THREE.InterleavedBufferAttribute },
    offscreen?: boolean
  }){

    this.boidBox = obj.boidBox
    this.offscreen = !!obj.offscreen

    // scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 
      10, 
      obj.boundingBox.width / obj.boundingBox.height, 
      0.1, 
      100000
    );

    camera.position.z = 6000;
    camera.position.x = 4000;
    camera.position.y = 1000;

    // lights
    const light = new THREE.AmbientLight( 0xffffff );
    const dLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dLight.position.set(-3,5,4)
    const dLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
    dLight2.position.set(-3,5,4)

    // renderer
    const renderer = new THREE.WebGLRenderer({ canvas: obj.canvas, alpha: false });
    renderer.setPixelRatio(Math.min(obj.devicePixelRatio, 2))
    renderer.setSize( obj.boundingBox.width, obj.boundingBox.height, !this.offscreen );
    renderer.setClearColor( 0x000000, 0 )

    // boid
    const geometry = new THREE.BufferGeometry();
    const position = new THREE.Float32BufferAttribute(obj.initialPos, 3)
    position.setUsage( THREE.StreamDrawUsage );
    geometry.setAttribute( 'position', position );
    if(obj.geometryAttribute){
      Object.keys(obj.geometryAttribute).forEach(key => {
        if(!obj.geometryAttribute) return;
        if(!obj.geometryAttribute[key]) return;
        geometry.setAttribute(key, obj.geometryAttribute[key])
      })
    }

    const material = obj.customShaderMaterial ? obj.customShaderMaterial : new THREE.PointsMaterial( { 
      color: this.boidColor,
      transparent: false,
      size: this.boidSize
    });
    const boidPoints = new THREE.Points( geometry, material );


    scene.add( boidPoints );
    scene.add( light );
    scene.add( dLight );
    scene.add( dLight2 );

    this.renderer = renderer
    this.camera = camera
    this.scene = scene
    this.position = position
    this.geometry = geometry

    camera.lookAt(scene.position)
    this.renderer.render( scene, camera );

  }

  setScreenSize( 
    screenSize: { width:number, height: number },
    devicePixelRatio: number
  ){
    this.renderer.clear()
    this.renderer.setSize( screenSize.width, screenSize.height );
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    this.camera.aspect = screenSize.width / screenSize.height
    this.camera.updateProjectionMatrix()
  }

  draw(){
    this.renderer.render( this.scene, this.camera );
  }

}