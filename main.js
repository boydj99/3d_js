import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { drawWordSearch } from './utility'
import './style.css'

// create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//draw cubes
var numBoxes = 10;
var size = 15;
var drawn = false;

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//light 
const light = new THREE.AmbientLight(0x404040,50);
scene.add(light);

// camera                   fov, aspt ratio, near clipping point, far clipping point
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height, 0.1,2000);
camera.position.set(250,250,250) // nice 45 degree downwards starting angle
//camera.position.set(0,0,500);  // straight on for testing
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});

//orbiting
const controls = new OrbitControls(camera, canvas);

renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene,camera);

window.addEventListener("resize", ()=> {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("mousedown", ()=> {
  if(!drawn){
    drawWordSearch(size,numBoxes,scene);
    drawn = true;
  }
});

const loop = () => {
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}

loop();