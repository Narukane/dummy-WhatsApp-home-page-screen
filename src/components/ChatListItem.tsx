import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {ChatListStyle} from '../styles/ChatListStyles';
import {formatDateString} from '../options/dateUtils';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

type truncateProps = {text: string; limit: number; style: any};
const TruncateText = ({text, limit, style}: truncateProps) => {
  if (text.length <= limit) {
    return <Text style={style}>{text}</Text>;
  } else {
    const truncatedText = text.substring(0, limit) + '...';
    return <Text style={style}>{truncatedText}</Text>;
  }
};

const lastMessages = (arr: any) => {
  if (arr.length > 0) {
    return arr[arr.length - 1];
  } else {
    return null;
  }
};

type UserType = {
  phone_number: string;
  name: string;
};

type ItemProps = {
  dataItem: any;
  navigation: NavigationProp<ParamListBase>;
  user: UserType;
};
const ChatListItem = ({dataItem, navigation, user}: ItemProps) => {
  const last = lastMessages(dataItem.messages);
  const date = formatDateString(last.timestamp);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatRoom', {
          data: dataItem,
          user: user,
          group: dataItem?.group ? true : false,
        })
      }>
      <View style={ChatListStyle.itemsStyle}>
        <Image
          source={
            dataItem?.group === true
              ? dataItem.group_pic
                ? {uri: dataItem.group_pic}
                : require('../assets/group.png')
              : dataItem.users.profile_pic
              ? {uri: dataItem.users.profile_pic}
              : require('../assets/personal.png')
          }
          style={ChatListStyle.imagesItemStyle}
        />
        <View style={ChatListStyle.subitemStyle}>
          <View style={ChatListStyle.itemHeadingStyle}>
            <TruncateText
              text={
                dataItem?.group === true
                  ? dataItem.group_name
                  : dataItem.users.name
              }
              limit={70}
              style={ChatListStyle.itemTextHeadStyle}
            />
            <Text style={ChatListStyle.itemDateStyle}>{date}</Text>
          </View>
          <TruncateText
            text={
              dataItem?.group === true
                ? last.from.name + ': ' + last.msg
                : last.msg
            }
            limit={100}
            style={ChatListStyle.itemsTextStyle}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;
