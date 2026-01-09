import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import AuthListener from './utils/AuthListener';

export default function App() {
    return (
    <Provider store={store}>
     <AuthListener />
      <AppNavigator />
    </Provider>
  );
}
