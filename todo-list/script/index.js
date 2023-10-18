import { getElement, refreshInitialState } from "./utils.js";
import { appInitializing, getControlPanel, getInfoPanel } from "./main.js";
import { component } from "./component/component.js";

const wrap = appInitializing();

const controlPanel = getControlPanel();
const infoPanel = getInfoPanel();
const todoContainer = getElement("div", "todo-container");

controlPanel.append(component.deleteButton);
controlPanel.append(component.deleteLastButton);
controlPanel.append(component.enterToDoInputField);
controlPanel.append(component.addButton);

infoPanel.append(component.allLabel);
infoPanel.append(component.completedLabel);
infoPanel.append(component.showAllButton);
infoPanel.append(component.showCompletedButton);
infoPanel.append(component.searchInputField);

wrap.append(controlPanel);
wrap.append(infoPanel);

refreshInitialState();

wrap.append(todoContainer);
