import React, { useEffect, useRef, useState } from 'react';

class ChangeNotifier extends EventTarget {
  onNewOptions (options) {
    this.dispatchEvent(new CustomEvent('change', { detail: options }));
  }
}

// only render this shit once. it will be the root for the html module to modify
const HTMLAdapterFrozen = React.memo(({options, id}) => {
  return <div id={id} />
}, () => true)


const HTMLAdapter = ({ module: {script, callbackName }, options, setOption }) => {
  const changeNotifier = useRef(new ChangeNotifier());
  const [id] = useState(Math.random());

  useEffect(() => {
    changeNotifier.current.onNewOptions(options);
  }, [options]);

  useEffect(() => {
    let cleanup;
    document.body.append(script);
    cleanup = window[callbackName](id, options, setOption, changeNotifier.current);

    return () => {
      document.body.removeChild(script);
      if (cleanup) cleanup();
      console.log('script removed')
    };
  }, []);

  return (
    <HTMLAdapterFrozen id={id} options={options} />
  );
};

const ModuleAdapter = ({ module: Module, options, setOption }) => {
  switch(Module.type) {
    case 'react': return <Module options={options} setOption={setOption}/>
    case 'html': return <HTMLAdapter module={Module} options={options} setOption={setOption}/>
    default: throw new Error(`No adapter for ${Module.type}`);
  }
};

export default ModuleAdapter;
