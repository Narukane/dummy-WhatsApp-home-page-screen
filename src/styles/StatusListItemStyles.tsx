import {StyleSheet, Dimensions} from 'react-native';
import colors from '../options/color';

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth * 0.12;

export const StatusListItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
  },
  statusStyle: {
    borderRadius: imageSize / 2,
    width: imageSize,
    height: imageSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  statusText: {
    color: colors.whiteColor,
  },
  detailStyle: {
    marginLeft: 10,
  },
  nameStyle: {
    fontSize: 16,
    color: colors.headerColor,
  },
  dateStyle: {
    color: colors.darkGrayColor,
  },
});
