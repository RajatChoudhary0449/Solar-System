import * as THREE from "three";
export default function CreatePlanet(
  size,
  texture,
  distancefromsun,
  moon,
  ring
) {
  const textureLoader = new THREE.TextureLoader();
  const planetGeo = new THREE.SphereGeometry(size, 30, 30);
  const planetMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  const planetparent = new THREE.Object3D();
  planetparent.add(planet);
  planet.position.x = distancefromsun;
  let moonparents=[];
  if(moon.length)
  {
    for(let it of moon)
    {
      const moongeo=new THREE.SphereGeometry(it.radius,30,30);
      const moonmat=new THREE.MeshStandardMaterial({
        map: textureLoader.load(it.texture)
      })
      const mon=new THREE.Mesh(moongeo,moonmat);
      const moonparent=new THREE.Object3D();
      moonparent.add(mon);
      planetparent.add(moonparent);
      moonparent.position.x = distancefromsun; 
      mon.position.set(it.position+Math.random(),Math.random()*3,Math.random()*3);
      if(it.tiltangle) mon.rotation.x=it.tiltangle;
      moonparents.push(moonparent);
    }
  }
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
    planetRing.rotation.x = -0.5 * Math.PI + ring.tiltangle;
  }
  return { planet, planetparent, moonparents};
}
