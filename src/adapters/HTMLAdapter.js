import React, { useEffect, useRef, useState } from 'react';

class ChangeNotifier extends EventTarget {
  onNewOptions (data) {
    this.dispatchEvent(new CustomEvent('change', { detail: data }));
  }
}

// only render this shit once. it will be the root for the html module to modify
const HTMLAdapterFrozen = React.memo(({data, id}) => {
  return <div id={id} />
}, () => true);

const HTMLAdapter = ({ module: {script, callbackName }, data, setData }) => {
  const changeNotifier = useRef(new ChangeNotifier());
  const [id] = useState(Math.random());

  useEffect(() => {
    changeNotifier.current.onNewOptions(data);
  }, [data]);

  useEffect(() => {
    let cleanup;
    document.body.append(script);
    cleanup = window[callbackName](id, data, setData, changeNotifier.current);

    return () => {
      document.body.removeChild(script);
      if (cleanup) cleanup();
      console.log('script removed')
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HTMLAdapterFrozen id={id} data={data} />
  );
};


export default HTMLAdapter;
