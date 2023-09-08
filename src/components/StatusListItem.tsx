import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {formatDateString} from '../options/dateUtils';
import {formatTimeString} from '../options/timeUtils';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {StatusListItemStyle} from '../styles/StatusListItemStyles';

type ItemProps = {
  dataItem: any;
  navigation: NavigationProp<ParamListBase>;
};
const StatusListItem = ({dataItem, navigation}: ItemProps) => {
  const date = formatDateString(dataItem.timestamp);
  const time = formatTimeString(dataItem.timestamp);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('StatusDetail', {data: dataItem})}>
      <View style={StatusListItemStyle.container}>
        <View style={StatusListItemStyle.statusStyle}>
          <Text style={StatusListItemStyle.statusText}>
            {dataItem.status.text}
          </Text>
        </View>
        <View style={StatusListItemStyle.detailStyle}>
          <Text style={StatusListItemStyle.nameStyle}>{dataItem.name}</Text>
          <Text style={StatusListItemStyle.dateStyle}>
            {date}, {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StatusListItem;
