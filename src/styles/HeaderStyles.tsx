import {StyleSheet, Dimensions} from 'react-native';
import colors from '../options/color';

const screenWidth = Dimensions.get('window').width;

export const HeaderStyle = StyleSheet.create({
  containerStyle: {
    width: screenWidth,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: colors.primaryColor,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.whiteColor,
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    marginHorizontal: 10,
  },
  containerSearchStyle: {
    padding: 10,
    backgroundColor: colors.whiteColor,
  },
  inputContainerStyle: {
    flexDirection: 'row',
    backgroundColor: colors.grayColor,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  itemContainerStyle: {
    flex: 1,
  },
  itemLabelStyle: {
    fontSize: 16,
    color: colors.darkGrayColor,
    fontWeight: 'bold',
  },
  subItemStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonStyle: {
    marginTop: 10,
  },
  itemHeadStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateStyle: {
    fontSize: 10,
    color: colors.textColor,
  },
  inputTextStyle: {
    width: '100%',
    color: colors.messageColor,
  },
  textlabelStyle: {
    color: colors.textColor,
  },
});
