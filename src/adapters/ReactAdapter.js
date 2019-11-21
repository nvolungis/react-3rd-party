import React from 'react';

const ReactAdapter = ({module: Module, data, setData}) => {
  return <Module data={data} setData={setData}/>
};

export default ReactAdapter;
