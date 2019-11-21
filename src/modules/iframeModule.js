const script = `
  <style>
    body {
      margin: 0;
    }

  </style>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      let data = window.api.initialData;

      const root = Object.assign(document.createElement('div'), {
        innerHTML: 'hi from iframe - toggled: ',
      });

      const optionValue = Object.assign(document.createElement('span'), {
        id: 'optionvalue',
        innerHTML: data,
      });

      root.appendChild(optionValue);

      const onChange = ({detail: newData }) => {
        data = newData
        optionValue.innerHTML = data;
      };

      document.body.appendChild(root);

      window.api.addEventListener('change', onChange);

      const onClick = () => {
        window.api.setData(!data);
      };

      root.addEventListener('click', onClick);
    });
  </script>
`;

export default script;
