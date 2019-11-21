import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Api from './api';
import htmlModule from './modules/htmlModule';
import reactModule from './modules/reactModule';

const api = new Api();

ReactDOM.render(<App api={api}/>, document.getElementById('root'));

window.api = api;

setTimeout(() => {
  api.addHtml(htmlModule);
  api.addReact(reactModule)
}, 1000);

