import {Platform} from 'react-native';
import {KeyboardConfig} from './types';

export const appStyles = {
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
};

export const keyboardConfig: KeyboardConfig = {
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: Platform.OS === 'ios' ? 0 : 25,
};
