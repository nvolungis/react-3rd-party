import React, { useCallback, useEffect, useRef } from 'react';

const prepareSource = (src, options) => {
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

      setOption (payload) {
        window.parent.postMessage({ origin: 'react-iframe', payload }, '*');
      }

      get initialOptions () {
        return ${JSON.stringify(options)};
      }
    }

    window.api = new Api();
  </script>
  `;

  const finalSource = [apiSource, src].join('');

  return finalSource;
};

const FrozenIframe = React.memo(React.forwardRef(({src, options}, ref) => {
  return (
    <iframe
      srcDoc={prepareSource(src, options)}
      title="iframe"
      ref={ref}
      height={30}
      frameBorder={0}
    />
  );
}, (current, previous) => (current.src === previous.src)));

const IframeAdapter = ({ module: { html }, options, setOption }) => {
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
    sendMessage(options);
  }, [sendMessage, options]);

  useEffect(() => {
    const onWindowMessage = (event) => {
      if (!event) return;
      if (!event.data) return;
      if (event.data.origin !== 'react-iframe') return;

      setOption(event.data.payload);
    };

    window.addEventListener('message', onWindowMessage);

    return () => {
      window.removeEventListener('message', onWindowMessage);
    };
  }, [setOption, sendMessage]);

  return <FrozenIframe src={html} ref={iframeRef} options={options} />
}

export default IframeAdapter;
