import './style.css'

import * as thr from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new thr.Scene();

const camera = new thr.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new thr.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new thr.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new thr.MeshStandardMaterial({
  color: 0xff6347 
});
const torus = new thr.Mesh(geometry,material);

scene.add(torus);

const pointLight = new thr.PointLight(0xffffff);

pointLight.position.set(20,20,20);
const ambientLight = new thr.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera,renderer.domElement);

function addStuff(){
  const geometry = new thr.SphereGeometry(0.25,24,24);
  const material = new thr.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new thr.Mesh(geometry,material);
  const [x,y,z] = Array(3).fill().map(() => thr.MathUtils.randFloatSpread(100));
  cube.position.set(x,y,z);
  scene.add(cube);
}

Array(200).fill().forEach(addStuff);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene,camera); 
}
animate();