import * as THREE from 'three'

// create scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xc8d1e0)

// create geometry
const geometry = new THREE.SphereGeometry(3,64,32)
// material 
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
})
// mesh is geometry + material
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//light 
const light = new THREE.PointLight(0xffffff,170,100)
light.position.set(0,5,10)
scene.add(light)

// camera                   fov, aspt ratio, near clipping point, far clipping point
const camera = new THREE.PerspectiveCamera(45,800/600, 0.1,120)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(800,600)
renderer.render(scene,camera)
