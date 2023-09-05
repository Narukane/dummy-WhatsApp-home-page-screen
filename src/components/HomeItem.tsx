import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {HeaderStyle} from '../styles/HeaderStyles';
import {formatDateString} from '../options/dateUtils';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

type UserType = {
  phone_number: string;
  name: string;
};

type ItemProps = {
  dataItem: any;
  index: number;
  searchText: string;
  navigation: NavigationProp<ParamListBase>;
  user: UserType;
};
const HomeItem = ({
  dataItem,
  index,
  searchText,
  navigation,
  user,
}: ItemProps) => {
  return (
    <>
      {index === 0 && <Text>Messages</Text>}
      <View style={HeaderStyle.itemContainerStyle}>
        {dataItem.messages.map((message: any) => {
          const date = formatDateString(message.timestamp);
          if (message.msg.toLowerCase().includes(searchText.toLowerCase())) {
            return (
              <TouchableOpacity
                key={message.id}
                style={HeaderStyle.buttonStyle}
                onPress={() =>
                  navigation.navigate('ChatRoom', {
                    data: dataItem,
                    user: user,
                    group: dataItem?.group ? true : false,
                  })
                }>
                <View style={HeaderStyle.itemHeadStyle}>
                  <Text style={HeaderStyle.itemLabelStyle}>
                    {dataItem.group
                      ? dataItem.group_name
                      : message.from.name !== user.name
                      ? message.from.name
                      : 'You'}
                  </Text>
                  <Text style={HeaderStyle.dateStyle}>{date}</Text>
                </View>
                <View style={HeaderStyle.subItemStyle}>
                  {dataItem.group && (
                    <Text style={HeaderStyle.textlabelStyle}>
                      {message.from.name}:{' '}
                    </Text>
                  )}
                  <Text style={HeaderStyle.textlabelStyle}>{message.msg}</Text>
                </View>
              </TouchableOpacity>
            );
          }
          return null;
        })}
      </View>
    </>
  );
};

export default HomeItem;
