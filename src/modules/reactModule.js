import React from 'react';

const ReactComponent = ({data, setData}) => {
  return (
    <div onClick={() => {
      setData(!data);
    }}>
      hi from react - toggled: {data ? 'true' : 'false'}
    </div>
  );
};

export default ReactComponent;
