import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import CreatePlanet from "./Services/CreatePlanet";
import ModalWindow from "./Services/ModalWindow"
import starsTexture from "./Images/stars.jpg";
import sunTexture from "./Images/sun.jpg";
import mercuryTexture from "./Images/mercury.jpg";
import venusTexture from "./Images/venus.jpg";
import earthTexture from "./Images/earth.jpg";
import marsTexture from "./Images/mars.jpg";
import jupiterTexture from "./Images/jupiter.jpg";
import saturnTexture from "./Images/saturn.jpg";
import saturnRingTexture from "./Images/saturn ring.png";
import uranusTexture from "./Images/uranus.jpg";
import uranusRingTexture from "./Images/uranus ring.png";
import neptuneTexture from "./Images/neptune.jpg";
import plutoTexture from "./Images/pluto.jpg";
import { PI } from "three/tsl";
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const starttime = performance.now();
let lasttime = performance.now();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, //field of view
  window.innerWidth / window.innerHeight, //aspect
  0.1, //Near
  1000 //Far
);

const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.addEventListener("change", function () {
//   console.log(`${camera.position.x},${camera.position.y},${camera.position.z}`);
// });

ModalWindow();

camera.position.set(-90, 140, 140);

orbit.update();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

const gui = new dat.GUI();
const views = ["---", "Front View", "Top View", "Sun view"];
const options = {
  Days: 0,
  SunEffect: true,
  Rotation: true,
  Revolution: true,
  Orbits: false,
  Speed: 1,
  MotionSpeed: 10,
  View: "Front View",
};
const daysController = gui.add(options, "Days").listen();
setTimeout(() => {
  const input = daysController.domElement.querySelector("input");
  input.setAttribute("readonly", true);
  input.style.pointerEvents = "none";
}, 0);
gui.add(options, "SunEffect").onChange((e) => {
  if (e === true) {
    scene.remove(ambientLight);
    scene.add(pointLight);
  } else {
    scene.add(ambientLight);
    scene.remove(pointLight);
  }
});
gui.add(options, "Rotation");
gui.add(options, "Revolution");
const orbits = [
  new THREE.Mesh(
    new THREE.RingGeometry(27, 29, 60),
    new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide })
  ),
  new THREE.Mesh(
    new THREE.RingGeometry(43, 45, 60),
    new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide })
  ),
  new THREE.Mesh(
    new THREE.RingGeometry(61, 63, 60),
    new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide })
  ),
  new THREE.Mesh(
    new THREE.RingGeometry(77, 79, 60),
    new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide })
  ),
  new THREE.Mesh(
    new THREE.RingGeometry(99, 101, 60),
    new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide })
  ),
  new THREE.Mesh(
    new THREE.RingGeometry(137, 139, 60),
    new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide })
  ),
  new THREE.Mesh(
    new THREE.RingGeometry(175, 177, 60),
    new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide })
  ),
  new THREE.Mesh(
    new THREE.RingGeometry(199, 201, 60),
    new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide })
  ),
  new THREE.Mesh(
    new THREE.RingGeometry(215, 217, 60),
    new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide })
  ),
];
for (let it of orbits) it.rotation.x = -0.5 * Math.PI;
gui.add(options, "Orbits").onChange((e) => {
  if (e === true) {
    for (let it of orbits) scene.add(it);
  } else {
    for (let it of orbits) scene.remove(it);
  }
});
gui.add(options, "Speed", 0, 10);
gui.add(options, "MotionSpeed", 0, 100);
gui.add(options, "View", views).onChange((e) => {
  if (e === "Front View") {
    camera.position.set(-90, 140, 140);
  } else if (e === "Top View") {
    camera.position.set(
      -0.0002439019382374073,
      287.69888268129523,
      0.000152586013841888
    );
  } else if (e === "Sun view") {
    camera.position.set(
      -11.563101629441919,
      4.851992372790176,
      7.9054342080425934
    );
  } else {
  }
});
orbit.addEventListener("change", function (e) {
  if (options.View !== "---") {
    options.View = "---";
    gui.updateDisplay();
  }
});

const pointLight = new THREE.PointLight(0xffffff, 10000);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const { planet: mercury, planetparent: mercuryparent } = CreatePlanet(
  3.2,
  mercuryTexture,
  28
);
const { planet: venus, planetparent: venusparent } = CreatePlanet(
  5.8,
  venusTexture,
  44
);
const { planet: earth, planetparent: earthparent } = CreatePlanet(
  6,
  earthTexture,
  62
);
const { planet: mars, planetparent: marsparent } = CreatePlanet(
  4,
  marsTexture,
  78
);
const { planet: jupiter, planetparent: jupiterparent } = CreatePlanet(
  12,
  jupiterTexture,
  100
);
const { planet: saturn, planetparent: saturnparent } = CreatePlanet(
  10,
  saturnTexture,
  138,
  { innerRadius: 10, outerRadius: 20, texture: saturnRingTexture }
);
const { planet: uranus, planetparent: uranusparent } = CreatePlanet(
  7,
  uranusTexture,
  176,
  { innerRadius: 7, outerRadius: 12, texture: uranusRingTexture }
);
const { planet: neptune, planetparent: neptuneparent } = CreatePlanet(
  7,
  neptuneTexture,
  200
);
const { planet: pluto, planetparent: plutoparent } = CreatePlanet(
  2.8,
  plutoTexture,
  216
);
scene.add(mercuryparent);
scene.add(venusparent);
scene.add(earthparent);
scene.add(marsparent);
scene.add(jupiterparent);
scene.add(saturnparent);
scene.add(uranusparent);
scene.add(neptuneparent);
scene.add(plutoparent);

window.addEventListener("keypress", (e) => {
  const direction = new THREE.Vector3();
  const right = new THREE.Vector3();
  camera.getWorldDirection(direction);
  direction.normalize();
  right.crossVectors(camera.up, direction).normalize();

  if (e.key.toLowerCase() === "w")
    camera.position.add(direction.clone().multiplyScalar(options.MotionSpeed));
  else if (e.key.toLowerCase() === "a")
    camera.position.add(right.clone().multiplyScalar(options.MotionSpeed));
  else if (e.key.toLowerCase() === "s")
    camera.position.add(direction.clone().multiplyScalar(-options.MotionSpeed));
  else if (e.key.toLowerCase() === "d")
    camera.position.add(right.clone().multiplyScalar(-options.MotionSpeed));
});

function animate() {
  const overalltime = (performance.now() - starttime) / 1000; //Seconds.MilliSeconds
  // const roundedoffoveralltime=Math.floor(overalltime);
  const unittime = (performance.now() - lasttime) / 1000;

  orbit.update();

  sun.rotateY(!options.Revolution ? 0 : 0.004 * options.Speed);

  mercury.rotateY(!options.Rotation ? 0 : 0.004);
  venus.rotateY(!options.Rotation ? 0 : 0.002);
  earth.rotateY(!options.Rotation ? 0 : 0.002);
  mars.rotateY(!options.Rotation ? 0 : 0.002);
  jupiter.rotateY(!options.Rotation ? 0 : 0.04);
  saturn.rotateY(!options.Rotation ? 0 : 0.038);
  uranus.rotateY(!options.Rotation ? 0 : 0.03);
  neptune.rotateY(!options.Rotation ? 0 : 0.032);
  pluto.rotateY(!options.Rotation ? 0 : 0.008);

  mercuryparent.rotateY(!options.Revolution ? 0 : 0.04 * options.Speed);
  venusparent.rotateY(!options.Revolution ? 0 : 0.015 * options.Speed);
  earthparent.rotateY(!options.Revolution ? 0 : 0.01 * options.Speed);
  marsparent.rotateY(!options.Revolution ? 0 : 0.008 * options.Speed);
  jupiterparent.rotateY(!options.Revolution ? 0 : 0.002 * options.Speed);
  saturnparent.rotateY(!options.Revolution ? 0 : 0.0009 * options.Speed);
  uranusparent.rotateY(!options.Revolution ? 0 : 0.0004 * options.Speed);
  neptuneparent.rotateY(!options.Revolution ? 0 : 0.0001 * options.Speed);
  plutoparent.rotateY(!options.Revolution ? 0 : 0.00007 * options.Speed);
  renderer.render(scene, camera);
  if (options.Revolution)
    options.Days = options.Days + unittime * 36 * options.Speed;
  lasttime = performance.now();
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
