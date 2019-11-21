import React, {createContext, useContext, useReducer} from 'react';
import reducer, {initialState} from './reducer';

const EmbedOptionsContext = createContext({});

export const EmbedOptionsProvider = ({children}) => {
  const [options, dispatch] = useReducer(reducer, initialState);

  const value = {
    options,
    setOption: ({ key, value }) => dispatch({type: 'set', payload: { key, value }}),
  };

  return (
    <EmbedOptionsContext.Provider value={value}>
      {children}
    </EmbedOptionsContext.Provider>
  )
}

const useEmbedOptions = () => {
  const {options, setOption} = useContext(EmbedOptionsContext);

  return {options, setOption};
}

export default useEmbedOptions;
