import {StyleSheet, Dimensions} from 'react-native';
import colors from '../options/color';

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth * 0.1;

export const ChatRoomStyle = StyleSheet.create({
  headingStyle: {
    padding: 10,
    backgroundColor: colors.primaryColor,
    flexDirection: 'row',
    minHeight: imageSize,
    alignItems: 'center',
  },
  headingLabelStyle: {
    color: colors.whiteColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headingButtonStyle: {
    flexDirection: 'row',
    minHeight: imageSize,
    alignItems: 'center',
  },
  buttonBackStyle: {
    marginRight: 10,
  },
  containerStyle: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    padding: 5,
  },
  messageContainerStyleLeft: {
    flexDirection: 'row',
    margin: 5,
  },
  messageContainerStyleRight: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: 5,
  },
  messageStyleLeft: {
    backgroundColor: colors.whiteColor,
    maxWidth: '80%',
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  messageStyleRight: {
    backgroundColor: colors.secondaryColor,
    maxWidth: '90%',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  messageLabelStyle: {
    color: colors.messageColor,
  },
  messageHeadLabelStyle: {
    fontWeight: '600',
  },
  messageTimeLabelStyle: {
    alignSelf: 'flex-end',
    fontSize: 10,
    marginBottom: -5,
    marginTop: 2,
  },
  sendContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    borderRadius: 20,
    backgroundColor: colors.whiteColor,
    width: '85%',
    margin: 5,
    height: imageSize,
    color: colors.messageColor,
  },
  sendButtonStyle: {
    borderRadius: imageSize / 2,
    backgroundColor: colors.primaryColor,
    width: imageSize,
    height: imageSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiViewStyle: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    right: 0,
    alignItems: 'flex-end',
  },
  emojiViewLabelStyle: {
    borderRadius: 5,
    padding: 1,
    backgroundColor: colors.whiteColor,
  },
  imagesItemStyle: {
    borderRadius: imageSize / 2,
    width: imageSize,
    height: imageSize,
  },
  emojiContainerStyle: {
    marginBottom: 15,
  },
});
