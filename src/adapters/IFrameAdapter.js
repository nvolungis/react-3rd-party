import React, { useCallback, useEffect, useRef } from 'react';

const prepareSource = (src, data) => {
  const apiSource = `
  <script>
    class Api extends EventTarget {
      constructor() {
        super();
        window.addEventListener('message', (event) => {
          if (event.data.origin !== 'react-iframe') return;

          this.dispatchEvent(new CustomEvent('change', { detail: event.data.payload }));
        });
      }

      setData (payload) {
        window.parent.postMessage({ origin: 'react-iframe', payload }, '*');
      }

      get initialData () {
        return ${data};
      }
    }

    window.api = new Api();
  </script>
  `;

  const finalSource = [apiSource, src].join('');

  return finalSource;
};

const FrozenIframe = React.memo(React.forwardRef(({src, data}, ref) => {
  return (
    <iframe
      srcDoc={prepareSource(src, data)}
      title="iframe"
      ref={ref}
      height={30}
      frameBorder={0}
    />
  );
}, (current, previous) => (current.src === previous.src)));

const IframeAdapter = ({ module: { html }, data, setData }) => {
  const iframeRef = useRef();

  const sendMessage = useCallback((message) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({
        origin: 'react-iframe',
        payload: message,
      }, null);
    }
  }, []);

  useEffect(() => {
    sendMessage(data);
  }, [sendMessage, data]);

  useEffect(() => {
    const onWindowMessage = (event) => {
      if (!event) return;
      if (!event.data) return;
      if (event.data.origin !== 'react-iframe') return;

      setData(event.data.payload);
    };

    window.addEventListener('message', onWindowMessage);

    return () => {
      window.removeEventListener('message', onWindowMessage);
    };
  }, [setData, sendMessage]);

  return <FrozenIframe src={html} ref={iframeRef} data={data} />
}

export default IframeAdapter;
