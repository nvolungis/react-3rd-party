import React, { useState } from 'react';
import ModuleAdapter from './ModuleAdapter';
import useApi from './useApi';

function App({api}) {
  const [modules, clear] = useApi(api);
  const [data, setData] = useState(false);

  return (
    <div>
      <label>has play button</label>
      <input
        type="checkbox"
        name="toggled"
        checked={data}
        onChange={(event) => {
          setData(event.target.checked);
      }}/>

      <button onClick={clear}>clear</button>

      {modules.map((module, index) => (
        <ModuleAdapter key={index} module={module} data={data} setData={setData} />
      ))}
    </div>
  );
};

export default App;
