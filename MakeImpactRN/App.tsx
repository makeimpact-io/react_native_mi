import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import { initiateRealtimeData } from './src/api/firebase/data';
import { Navigator } from './src/navigation/Navigator';
import store from './src/state/store';

const App = () => {
  initiateRealtimeData();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
