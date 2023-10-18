import { getTodoList, refreshInitialState } from "./utils.js";
import {
  enterToDoInputField,
  getAddButton,
  getAllLabel,
  getCompletedLabel,
  getControlPanel,
  getDeleteAllButton,
  getDeleteLastButton,
  getInfoPanel,
  getSearchInputField,
  getShowAllButton,
  getShowCompletedButton,
  getWrap,
  todoContainer,
} from "./element.js";

const todos = getTodoList();

const wrap = getWrap();
const controlPanel = getControlPanel();
const infoPanel = getInfoPanel();

controlPanel.append(getDeleteAllButton());
controlPanel.append(getDeleteLastButton());
controlPanel.append(enterToDoInputField);
controlPanel.append(getAddButton());

infoPanel.append(getAllLabel(todos.length));
infoPanel.append(getCompletedLabel());
infoPanel.append(getShowAllButton());
infoPanel.append(getShowCompletedButton());
infoPanel.append(getSearchInputField());

wrap.append(controlPanel);
wrap.append(infoPanel);

refreshInitialState();

wrap.append(todoContainer);
