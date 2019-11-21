import React from 'react';
import { EmbedOptionsProvider } from './context/embedOptions';
import Main from './Main';
import useApi from './useApi';

function App({api}) {
  const [modules, clear] = useApi(api);

  return (
    <EmbedOptionsProvider>
      <Main modules={modules} clear={clear} />
    </EmbedOptionsProvider>
  );
}

export default App;
