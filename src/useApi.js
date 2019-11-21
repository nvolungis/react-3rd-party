import {useEffect, useReducer} from 'react';

const reducer = (state, action) => {
  switch(action.type) {
    case 'add': return state.concat(action.payload);
    case 'clear': return [];
    default: throw new Error(`case not handled ${action.type}`);
  }
};

const useApi = (api) => {
  const [modules, dispatch] = useReducer(reducer, []);

  const clear = () => {
    dispatch({type: 'clear' });
  }

  useEffect(() => {
    const add = ({detail: ModuleComponent}) => {
      dispatch({type: 'add', payload: ModuleComponent});
    }

    api.addEventListener('add', add);

    return () => {
      api.removeEventListener('add', add);
    }
  }, [api, dispatch, modules]);

  return [modules, clear];
};

export default useApi;
