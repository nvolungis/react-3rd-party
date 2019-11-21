import React, { useEffect, useRef, useState } from 'react';

class ChangeNotifier extends EventTarget {
  onNewOptions (options) {
    this.dispatchEvent(new CustomEvent('change', { detail: options }));
  }
}

// only render this shit once. it will be the root for the html module to modify
const HTMLAdapterFrozen = React.memo(({options, id}) => {
  return <div id={id} />
}, () => true);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HTMLAdapterFrozen id={id} options={options} />
  );
};


export default HTMLAdapter;
