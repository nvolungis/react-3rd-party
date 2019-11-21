class Api extends EventTarget {
  addReact(component) {
    component.type = 'react';
    this.dispatchEvent(new CustomEvent('add', { detail: component}));
  }

  addHtml({script, callbackName}) {
    this.dispatchEvent(new CustomEvent('add', { detail: { script, callbackName, type: 'html' }}));
  }

  addIframe(html) {
    this.dispatchEvent(new CustomEvent('add', { detail: { html, type: 'iframe' }}));
  }
}

export default Api;
