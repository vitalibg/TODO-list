import { getElement } from "./utils.js";

export function appInitializing() {
  const main = document.getElementById("root");
  const container = getElement("div", "container");
  const wrap = getElement("div", "wrap");
  main.append(container);
  container.append(wrap);
  return wrap;
}

export function getControlPanel() {
  const controlPanel = getElement("div", "panel");
  controlPanel.classList.add("control-panel");
  return controlPanel;
}

export function getInfoPanel() {
  const infoPanel = getElement("div", "info-panel");
  infoPanel.classList.add("panel");
  return infoPanel;
}
