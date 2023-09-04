import {StyleSheet} from 'react-native';
import colors from '../options/color';

export const tabNavigatorStyles = StyleSheet.create({
  labelStyle: {
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  tabBarStyle: {
    backgroundColor: colors.primaryColor,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.whiteColor,
  },
});

export const screenOptions = {
  tabBarLabelStyle: tabNavigatorStyles.labelStyle,
  tabBarStyle: tabNavigatorStyles.tabBarStyle,
  tabBarActiveTintColor: colors.whiteColor,
  tabBarIndicatorStyle: tabNavigatorStyles.tabBarIndicatorStyle,
  lazy: true,
};
