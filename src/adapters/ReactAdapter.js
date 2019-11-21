import React from 'react';

const ReactAdapter = ({module: Module, options, setOption}) => {
  return <Module options={options} setOption={setOption}/>
};

export default ReactAdapter;
