import * as THREE from "three";
export default function LockAtPlanet(planet, sun, offsetDistance = 15) {
  const planetWorldPosition = new THREE.Vector3();
  const sunWorldPosition = new THREE.Vector3();

  planet.getWorldPosition(planetWorldPosition);
  sun.getWorldPosition(sunWorldPosition);

  const planetToSun = new THREE.Vector3()
    .subVectors(sunWorldPosition, planetWorldPosition)
    .normalize();
  const cameraPosition = planetWorldPosition
    .clone()
    .sub(planetToSun.multiplyScalar(offsetDistance));
  return {cameraPosition,planetWorldPosition};
};
