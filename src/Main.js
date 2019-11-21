import React from 'react';
import useEmbedOptions from './context/embedOptions';
import ModuleAdapter from './ModuleAdapter';

const Main = ({modules, clear}) => {
  const { options, setOption } = useEmbedOptions();

  return (
    <div>
      <label>has play button</label>
      <input
        type="checkbox"
        name="hasPlayButton"
        checked={options["hasPlayButton"]}
        onChange={(event) => {
          setOption({key: 'hasPlayButton', value: event.target.checked });
      }}/>

      <button onClick={clear}>clear</button>

      {modules.map((module, index) => (
        <ModuleAdapter key={index} module={module} options={options} setOption={setOption} />
      ))}
    </div>
  );
};

export default Main;
