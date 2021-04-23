const RootReducer = state => state;

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';

let store = { ...createStore(RootReducer), runSaga: () => {}, injectedReducers: {}, injectedSagas: {}};

export default function Provider({ story }) {
  return <ReduxProvider store={store}>{story}</ReduxProvider>;
}
