import {StyleSheet, Dimensions} from 'react-native';
import colors from '../options/color';

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth * 0.3;

export const GroupDetailStyle = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: colors.whiteColor,
    padding: 10,
  },
  subHeadStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imagesItemStyle: {
    borderRadius: imageSize / 2,
    width: imageSize,
    height: imageSize,
  },
  contactStyle: {
    alignItems: 'center',
  },
  nameStyle: {
    fontWeight: 'bold',
    color: colors.messageColor,
  },
  labelStyle: {
    color: colors.textColor,
  },
});
