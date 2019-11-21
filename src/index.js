import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Api from './api';
import htmlModule from './modules/htmlModule';
import reactModule from './modules/reactModule';
import iframeModule from './modules/iframeModule';

const api = new Api();

ReactDOM.render(<App api={api}/>, document.getElementById('root'));

window.api = api;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run () {
  await wait(1000);
  api.addHtml(htmlModule);
  await wait(1000);
  api.addReact(reactModule);
  await wait(1000);
  api.addIframe(iframeModule);
}

window.run = run;

run();
