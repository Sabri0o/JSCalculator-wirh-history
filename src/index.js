import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import App from "./app";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
