import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer,  composeWithDevTools(applyMiddleware(thunk)));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App store={store}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
