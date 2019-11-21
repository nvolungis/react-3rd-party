import React from 'react';
import { EmbedOptionsProvider } from './context/embedOptions';
import Main from './Main';
import useApi from './useApi';
import Iframe from './Iframe';

const src = `
  <script>
    document.addEventListener('DOMContentLoaded', (event) => {
      const h1 = document.createElement('h1');
      h1.innerHTML = 'hi';
      document.body.appendChild(h1);
      window.api.sendMessage('hi!')
      window.api.addEventListener('change', ({ detail }) => {
        console.log('iframe received message', detail);
      });
    });
  </script>
`;


function App({api}) {
  const [modules, clear] = useApi(api);

  return (
    <EmbedOptionsProvider>
      <Main modules={modules} clear={clear} />
      <Iframe src={src} onMessage={(data) => {
        console.log('data', data);
      }}/>
    </EmbedOptionsProvider>
  );
}

export default App;
