import React from 'react';
import ReactAdapter from './adapters/ReactAdapter';
import HTMLAdapter from './adapters/HTMLAdapter';
import IframeAdapter from './adapters/IframeAdapter';

const ModuleAdapter = ({ module, options, setOption }) => {
  switch(module.type) {
    case 'react': return <ReactAdapter module={module} options={options} setOption={setOption} />
    case 'html': return <HTMLAdapter module={module} options={options} setOption={setOption} />
    case 'iframe': return <IframeAdapter module={module} options={options} setOption={setOption} />
    default: throw new Error(`No adapter for ${module.type}`);
  }
};

export default ModuleAdapter;
