const script = `
  <style>
    body {
      margin: 0;
    }

  </style>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      let options = window.api.initialOptions;

      const root = Object.assign(document.createElement('div'), {
        innerHTML: 'hi from iframe - hasPlayButton: ',
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

      document.body.appendChild(root);

      window.api.addEventListener('change', onChange);

      const onClick = () => {
        window.api.setOption({key: 'hasPlayButton', value: !options.hasPlayButton });
      };

      root.addEventListener('click', onClick);
    });
  </script>
`;

export default script;
