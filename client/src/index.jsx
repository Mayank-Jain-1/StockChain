import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from './reducers/rootReducer';

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

root.render(
  //  <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
  //  </React.StrictMode>
);
