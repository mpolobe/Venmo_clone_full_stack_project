// import React from "react";
// import ReactDOM from "react-dom";

// document.addEventListener("DOMContentLoaded", () => {
//   const root = document.getElementById("root");
//   ReactDOM.render(<h1>Welcome to PayUp</h1>, root);
// });

import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from './components/root';
import { logout } from './actions/session_actions';

document.addEventListener("DOMContentLoaded", () => {

  let store;
  if(window.currentUser){
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.dispatch = store.dispatch
  window.logout = logout
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});