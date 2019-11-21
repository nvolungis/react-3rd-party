import React, { useCallback, useEffect, useRef } from 'react';

const prepareSource = (src) => {
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

      sendMessage (payload) {
        window.parent.postMessage({ origin: 'react-iframe', payload }, '*');
      }
    }

    window.api = new Api();
  </script>
  `;

  const finalSource = [apiSource, src].join('');

  return finalSource;
};

const FrozenIframe = React.memo(React.forwardRef(({src}, ref) => {
  return (
    <iframe srcDoc={prepareSource(src)} title="iframe" ref={ref} />
  );
}, (current, previous) => (current.src === previous.src)));

const Iframe = ({ src, onMessage = () => {}, options }) => {
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

      onMessage(event.data.payload);
    };

    window.addEventListener('message', onWindowMessage);

    return () => {
      window.removeEventListener('message', onWindowMessage);
    };
  }, [onMessage, sendMessage]);

  return <FrozenIframe src={src} ref={iframeRef} />
}

export default Iframe;
