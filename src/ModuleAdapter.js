import React from 'react';
import ReactAdapter from './adapters/ReactAdapter';
import HTMLAdapter from './adapters/HTMLAdapter';
import IframeAdapter from './adapters/IframeAdapter';

const ModuleAdapter = ({ module, data, setData }) => {
  switch(module.type) {
    case 'react': return <ReactAdapter module={module} data={data} setData={setData} />
    case 'html': return <HTMLAdapter module={module} data={data} setData={setData} />
    case 'iframe': return <IframeAdapter module={module} data={data} setData={setData} />
    default: throw new Error(`No adapter for ${module.type}`);
  }
};

export default ModuleAdapter;
