import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTab from '../navigation/HomeTab';
import ChatRoom from './chat/chatRoom';
import PersonalDetail from './chat/detailPersonal';
import GroupDetail from './chat/detailGroup';
import {stackOptions} from '../options/stackOptions';

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeTab} options={stackOptions} />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={stackOptions}
        />
        <Stack.Screen
          name="Personal"
          component={PersonalDetail}
          options={stackOptions}
        />
        <Stack.Screen
          name="Group"
          component={GroupDetail}
          options={stackOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
