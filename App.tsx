import 'react-native-gesture-handler';
import React from 'react';
import {KeyboardAvoidingView} from 'react-native';

import {
  appStyles,
  keyboardConfig,
} from './src/options/keyboardAvoidingViewOptions';

import MainNavigator from './src/screens';

const App: React.FC = () => {
  return (
    <KeyboardAvoidingView
      style={appStyles.container}
      behavior={keyboardConfig.behavior}>
      <MainNavigator />
    </KeyboardAvoidingView>
  );
};

export default App;
