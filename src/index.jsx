/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";

import navBar from "./Nav";
import alertaBox from "./alerta";
import messageArea from "./isoAreas";
import categories from "./tabs";
import inputs from "./inputsData";

render(navBar, nav);
render(alertaBox, alerta);
render(messageArea, isoMessages);
render(categories, tabsBar);
render(inputs, root);
