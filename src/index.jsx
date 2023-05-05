/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";

import navBar from "./Nav";
import alertaBox from "./alerta";
import inputs from "./inputsData";

render(navBar, nav);
render(alertaBox, alerta);
render(inputs, root);
