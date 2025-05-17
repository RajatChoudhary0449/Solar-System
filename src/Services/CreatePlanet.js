import * as THREE from "three";
export default function CreatePlanet(size, texture, distancefromsun, ring) {
  const textureLoader = new THREE.TextureLoader();
  const planetGeo = new THREE.SphereGeometry(size, 30, 30);
  const planetMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  const planetparent = new THREE.Object3D();
  planetparent.add(planet);
  planet.position.x = distancefromsun;

  if (ring) {
    const planetRingGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const planetRingMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const planetRing = new THREE.Mesh(planetRingGeo, planetRingMat);
    planetparent.add(planetRing);
    planetRing.position.x = distancefromsun;
    planetRing.rotation.x = -0.5 * Math.PI;
  }
  return { planet, planetparent };
}
