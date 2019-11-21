const callbackName = 'myPlugin';

const script = document.createElement('script');
script.type = "text/javascript";
script.text = `
  window.myPlugin = (rootId, initialData, setData, changeNotifier) => {
    let data = initialData;

    const root = Object.assign(document.getElementById(rootId), {
      innerHTML: 'hi from html - toggled: ',
    });

    const optionValue = Object.assign(document.createElement('span'), {
      id: 'optionvalue',
      innerHTML: data,
    });

    root.appendChild(optionValue);

    const onChange = ({detail: newData }) => {
      data = newData;
      optionValue.innerHTML = data;
    };

    changeNotifier.addEventListener('change', onChange);

    const onClick = () => {
      setData(!data);
    };

    root.addEventListener('click', onClick);

    console.log('plugin script executed');

    return () => {
      changeNotifier.removeEventListener('change', onChange);
      root.removeEventListener('click', onClick);
      console.log('handlers removed');
    }
  };
`;

export default { script, callbackName };
