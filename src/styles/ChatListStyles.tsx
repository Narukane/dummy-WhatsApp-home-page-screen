import {StyleSheet, Dimensions} from 'react-native';
import colors from '../options/color';

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth * 0.12;

export const ChatListStyle = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.whiteColor,
    padding: 4,
    flex: 1,
  },
  itemsStyle: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subitemStyle: {
    flex: 1,
    padding: 5,
  },
  itemHeadingStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTextHeadStyle: {
    color: colors.headerColor,
    fontSize: 16,
    fontWeight: '500',
  },
  itemsTextStyle: {
    color: colors.textColor,
    fontSize: 14,
  },
  itemDateStyle: {
    color: colors.textColor,
    fontSize: 12,
  },
  imagesItemStyle: {
    borderRadius: imageSize / 2,
    width: imageSize,
    height: imageSize,
  },
});
