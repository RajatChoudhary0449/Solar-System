import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import LabelPlanet from "./Services/LabelPlanet";
import LockAtPlanet from "./Services/LockAtPlanet";
import * as dat from "dat.gui";
import CreatePlanet from "./Services/CreatePlanet";
import ModalWindow from "./Services/ModalWindow";
import starsTexture from "./Images/stars.jpg";
import sunTexture from "./Images/sun.jpg";
import mercuryTexture from "./Images/mercury.jpg";
import venusTexture from "./Images/venus.jpg";
import earthTexture from "./Images/earth2.jpg";
import marsTexture from "./Images/mars2.jpg";
import jupiterTexture from "./Images/jupiter.jpg";
import saturnTexture from "./Images/saturn.jpeg";
import saturnRingTexture from "./Images/saturn ring.png";
import uranusTexture from "./Images/uranus.webp";
import uranusRingTexture from "./Images/uranus ring.png";
import neptuneTexture from "./Images/neptune.jpg";
import plutoTexture from "./Images/pluto.jpg";
import earthmoon from './Images/moon.jpg';
import phobosTexture from './Images/phobos.jpeg';
import deimosTexture from './Images/Deimos.webp';

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const starttime = performance.now();
let lasttime = performance.now();
const scene = new THREE.Scene();
const arrows = document.querySelector("#optional-buttons");
const [leftarrow, rightarrow] = arrows.children;
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

ModalWindow("<p>You can use <strong>WASD</strong> for your movement.</p>", 10);

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

const handleViewChange = (e) => {
  if (e === "Front View") {
    camera.position.set(-90, 140, 140);
    camera.lookAt(sun);
  } else if (e === "Top View") {
    camera.position.set(
      -0.0002439019382374073,
      287.69888268129523,
      0.000152586013841888
    );
    camera.lookAt(sun);
  } else if (e === "Central View") {
    camera.position.set(
      -11.563101629441919,
      4.851992372790176,
      7.9054342080425934
    );
    camera.lookAt(mercury);
  } else {
  }
};
const handleSunGlareChange = (e) => {
  if (e === true) {
    scene.remove(ambientLight);
    scene.add(pointLight);
  } else {
    scene.add(ambientLight);
    scene.remove(pointLight);
  }
};

const gui = new dat.GUI();
const views = ["---", "Front View", "Top View", "Central View"];
const watch = [
  "None",
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];
const options = {
  Days: 0,
  SunGlare: true,
  Rotation: true,
  Revolution: true,
  Orbits: false,
  Labels: false,
  Speed: 10,
  MotionSpeed: 10,
  View: "Front View",
  Watch: "None",
};
const daysController = gui.add(options, "Days").listen();
setTimeout(() => {
  const input = daysController.domElement.querySelector("input");
  input.setAttribute("readonly", true);
  input.style.pointerEvents = "none";
}, 0);
gui.add(options, "SunGlare").onChange(handleSunGlareChange);
const RotationController = gui.add(options, "Rotation");
const RevolutionController = gui.add(options, "Revolution");
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
const OrbitsController = gui.add(options, "Orbits").onChange((e) => {
  if (e === true) {
    for (let it of orbits) scene.add(it);
  } else {
    for (let it of orbits) scene.remove(it);
  }
});
const LabelController = gui.add(options, "Labels").onChange((e) => {
  if (e === true) {
    for (let { LabelObject, planet } of labelRenderers) planet.add(LabelObject);
  } else {
    for (let { LabelObject, planet } of labelRenderers)
      planet.remove(LabelObject);
  }
});
gui.add(options, "Speed", 0, 100).name("Planet Speed");
const YourSpeedController = gui
  .add(options, "MotionSpeed", 0, 100)
  .name("Your Speed");

orbit.addEventListener("change", function (e) {
  if (options.View !== "---") {
    options.View = "---";
    gui.updateDisplay();
  }
  // if(options.Watch!=="---"){
  //  alert("Sorry you cannot control the position while watching any planet, Set the Watch to --- to re-enable your controls.")
  // }
});
let welcomeForThePlanetLock = true;
const rightarrowTask = () => {
  const curidx = watch.findIndex((ele) => ele === options.Watch);
  if (curidx === watch.length - 1) {
    ModalWindow("Sorry you are already at the last index", 10);
    return;
  }
  options.Watch = watch[curidx + 1];
  gui.updateDisplay();
};
const leftarrowTask = () => {
  const curidx = watch.findIndex((ele) => ele === options.Watch);
  if (curidx === 1) {
    options.SunGlare = true;
    handleSunGlareChange(true);
    gui.updateDisplay();
    ViewController.domElement.querySelector("select").disabled = false;
    welcomeForThePlanetLock = true;
    arrows.classList.add("hidden");
    leftarrow.removeEventListener("click", leftarrowTask);
    rightarrow.removeEventListener("click", rightarrowTask);
    options.Watch = "None";
    console.log(options.Watch);
    gui.updateDisplay();
    return;
  } else if (curidx === 0) {
    ModalWindow("Sorry you are already at the starting index", 10);
    return;
  }
  options.Watch = watch[curidx - 1];
  gui.updateDisplay();
};

const handleWatchChange = (e) => {
  if (e === "None") {
    options.SunGlare = true;
    handleSunGlareChange(true);
    gui.updateDisplay();
    ViewController.domElement.querySelector("select").disabled = false;
    welcomeForThePlanetLock = true;
    arrows.classList.add("hidden");
    leftarrow.removeEventListener("click", leftarrowTask);
    rightarrow.removeEventListener("click", rightarrowTask);
  } else {
    options.SunGlare = false;
    handleSunGlareChange(false);
    gui.updateDisplay();
    ViewController.domElement.querySelector("select").disabled = true;
    if (welcomeForThePlanetLock) {
      ModalWindow(
        'Welcome to the planet lock, Choose lockAt="None" to disable the lock',
        15
      );
      welcomeForThePlanetLock = false;
      arrows.classList.remove("hidden");
      leftarrow.addEventListener("click", leftarrowTask);
      rightarrow.addEventListener("click", rightarrowTask);
    }
  }
};
const ViewController = gui
  .add(options, "View", views)
  .onChange(handleViewChange);
gui.add(options, "Watch", watch).name("Lock At").onChange(handleWatchChange);

const pointLight = new THREE.PointLight(0xffffff, 10000);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff);

const textureLoader = new THREE.TextureLoader();

let labelRenderers = [];
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);
labelRenderers.push({ ...LabelPlanet("Sun", 0), planet: sun });

const { planet: mercury, planetparent: mercuryparent } = CreatePlanet(
  3.2,
  mercuryTexture,
  28,
  []
);
labelRenderers.push({ ...LabelPlanet("Mercury"), planet: mercury });

const { planet: venus, planetparent: venusparent } = CreatePlanet(
  5.8,
  venusTexture,
  44,
  []
);
labelRenderers.push({ ...LabelPlanet("Venus"), planet: venus });

const { planet: earth, planetparent: earthparent,moonparents:earthMoon } = CreatePlanet(
  6,
  earthTexture,
  62,
  [{radius:0.87,texture:earthmoon,position:7}]
);
labelRenderers.push({ ...LabelPlanet("Earth"), planet: earth });

const { planet: mars, planetparent: marsparent, moonparents:marsMoons } = CreatePlanet(
  4,
  marsTexture,
  78,
  [
    {radius:0.87,texture:phobosTexture,position:5.5,tiltangle:0.012},
    {radius:0.87,texture:deimosTexture,position:7.5,tiltangle:0.024}
  ]
);
labelRenderers.push({ ...LabelPlanet("Mars"), planet: mars });

const { planet: jupiter, planetparent: jupiterparent } = CreatePlanet(
  12,
  jupiterTexture,
  100,
  []
);
labelRenderers.push({ ...LabelPlanet("Jupiter"), planet: jupiter });

const { planet: saturn, planetparent: saturnparent } = CreatePlanet(
  10,
  saturnTexture,
  138,
  [],
  {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture,
    tiltangle: 0.466,
  }
);
labelRenderers.push({ ...LabelPlanet("Saturn"), planet: saturn });

const { planet: uranus, planetparent: uranusparent } = CreatePlanet(
  7,
  uranusTexture,
  176,
  [],
  {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture,
    tiltangle: 0.466,
  }
);
labelRenderers.push({ ...LabelPlanet("Uranus"), planet: uranus });

const { planet: neptune, planetparent: neptuneparent } = CreatePlanet(
  7,
  neptuneTexture,
  200,
  []
);
labelRenderers.push({ ...LabelPlanet("Neptune"), planet: neptune });

const { planet: pluto, planetparent: plutoparent } = CreatePlanet(
  2.8,
  plutoTexture,
  216,
  []
);
labelRenderers.push({ ...LabelPlanet("Pluto"), planet: pluto });

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
const handleOptionsWatchPlanetChange = (planet, offsetDistance = 15) => {
  const { cameraPosition, planetWorldPosition } = LockAtPlanet(
    planet,
    sun,
    offsetDistance
  );
  camera.position.copy(cameraPosition);
  camera.lookAt(planetWorldPosition);
};
function animate() {
  // const overalltime = (performance.now() - starttime) / 1000; //Seconds.MilliSeconds
  // const roundedoffoveralltime=Math.floor(overalltime);
  const unittime = (performance.now() - lasttime) / 1000;
  orbit.update();

  renderer.render(scene, camera);

  if (options.Labels) {
    for (let { labelRenderer } of labelRenderers)
      labelRenderer.render(scene, camera);
  }

  if (options.Watch !== "None") {
    switch (options.Watch) {
      case "Mercury":
        handleOptionsWatchPlanetChange(mercury);
        break;
      case "Venus":
        handleOptionsWatchPlanetChange(venus);
        break;
      case "Earth":
        handleOptionsWatchPlanetChange(earth);
        break;
      case "Mars":
        handleOptionsWatchPlanetChange(mars);
        break;
      case "Jupiter":
        handleOptionsWatchPlanetChange(jupiter, 25);
        break;
      case "Saturn":
        handleOptionsWatchPlanetChange(saturn, 25);
        break;
      case "Uranus":
        handleOptionsWatchPlanetChange(uranus);
        break;
      case "Neptune":
        handleOptionsWatchPlanetChange(neptune);
        break;
      case "Pluto":
        handleOptionsWatchPlanetChange(pluto);
        break;
    }
  }

  sun.rotateY(!options.Revolution ? 0 : 0.004 * options.Speed*0.1);

  mercury.rotateY(!options.Rotation ? 0 : 0.004);
  venus.rotateY(!options.Rotation ? 0 : 0.002);
  earth.rotateY(!options.Rotation ? 0 : 0.002);
  mars.rotateY(!options.Rotation ? 0 : 0.002);
  jupiter.rotateY(!options.Rotation ? 0 : 0.04);
  saturn.rotateY(!options.Rotation ? 0 : 0.038);
  uranus.rotateY(!options.Rotation ? 0 : 0.03);
  neptune.rotateY(!options.Rotation ? 0 : 0.032);
  pluto.rotateY(!options.Rotation ? 0 : 0.008);

  earthMoon.forEach(element => {
    element.rotateY(!options.Rotation?0:0.01);
  });
  marsMoons.forEach(element=>{
    element.rotateY(!options.Rotation?0:0.01);
  })

  mercuryparent.rotateY(!options.Revolution ? 0 : 0.04 * options.Speed*0.1);
  venusparent.rotateY(!options.Revolution ? 0 : 0.015 * options.Speed*0.1);
  earthparent.rotateY(!options.Revolution ? 0 : 0.01 * options.Speed*0.1);
  marsparent.rotateY(!options.Revolution ? 0 : 0.008 * options.Speed*0.1);
  jupiterparent.rotateY(!options.Revolution ? 0 : 0.002 * options.Speed*0.1);
  saturnparent.rotateY(!options.Revolution ? 0 : 0.0009 * options.Speed*0.1);
  uranusparent.rotateY(!options.Revolution ? 0 : 0.0004 * options.Speed*0.1);
  neptuneparent.rotateY(!options.Revolution ? 0 : 0.0001 * options.Speed*0.1);
  plutoparent.rotateY(!options.Revolution ? 0 : 0.00007 * options.Speed*0.1);
  renderer.render(scene, camera);
  if (options.Revolution)
    options.Days = options.Days + unittime * 36 * options.Speed*0.1;
  lasttime = performance.now();
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
