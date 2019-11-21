import React from 'react';

const ReactComponent = ({options, setOption}) => {
  return (
    <div onClick={() => {
      setOption({key: 'hasPlayButton', value: !options.hasPlayButton});
    }}>
      hi from react - hasPlayButton: {options.hasPlayButton ? 'true' : 'false'}
    </div>
  );
};

export default ReactComponent;
