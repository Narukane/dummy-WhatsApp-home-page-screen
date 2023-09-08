import React from 'react';
import {View, Text} from 'react-native';
import {StatusDetailStyle} from '../../styles/StatusDetailStyles';
import {useRoute} from '@react-navigation/native';
import {formatDateString} from '../../options/dateUtils';
import {formatTimeString} from '../../options/timeUtils';

const StatusDetail: React.FC = () => {
  const route = useRoute();
  const {data}: any = route.params;
  const date = formatDateString(data.timestamp);
  const time = formatTimeString(data.timestamp);
  return (
    <View style={StatusDetailStyle.container}>
      <View>
        <Text>{data.name}</Text>
        <Text>
          {date}. {time}
        </Text>
      </View>
      <View>
        <Text>{data.status.text}</Text>
      </View>
    </View>
  );
};

export default StatusDetail;
