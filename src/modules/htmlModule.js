const callbackName = 'myPlugin';

const script = document.createElement('script');
script.type = "text/javascript";
script.text = `
  window.myPlugin = (rootId, initialOptions, setOption, changeNotifier) => {
    let options = initialOptions;

    const root = Object.assign(document.getElementById(rootId), {
      innerHTML: 'hi from html - hasPlayButton: ',
    });

    const optionValue = Object.assign(document.createElement('span'), {
      id: 'optionvalue',
      innerHTML: options.hasPlayButton,
    });

    root.appendChild(optionValue);

    const onChange = ({detail: newOptions }) => {
      options = newOptions
      optionValue.innerHTML = options.hasPlayButton;
    };

    changeNotifier.addEventListener('change', onChange);

    const onClick = () => {
      setOption({key: 'hasPlayButton', value: !options.hasPlayButton });
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
