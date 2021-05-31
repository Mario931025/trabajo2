import React, {createContext, useReducer} from 'react';
import globalReducer, {INITIAL_STATE_GLOBAL} from './global/reducer';

export const StoreContext = createContext({});

const Store = ({children}) => {
  const [globalState, globalDispatch] = useReducer(
    globalReducer,
    INITIAL_STATE_GLOBAL,
  );

  return (
    <StoreContext.Provider
      value={{
        state: {globalState},
        globalDispatch,
      }}>
      {children}
    </StoreContext.Provider>
  );
};
export default Store;
