import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
export default function LabelPlanet (text,position=15){
  const div = document.createElement("div");
  div.textContent = text;
  div.style.backgroundColor = "white";
  div.style.backgroundColor = "rgba(255,255,255,0.6)";
  div.style.color = "#444";
  div.style.padding = "5px";
  div.style.borderRadius = "10px";
  const LabelObject = new CSS2DObject(div);
  LabelObject.position.set(0, position, 0);
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0";
  labelRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(labelRenderer.domElement);
  return {LabelObject,labelRenderer};
};
