import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {apiGet} from '../../api/api';
import * as endPoint from '../../api/endPoint';
import {ChatListStyle} from '../../styles/ChatListStyles';
import {formatDateString} from '../../options/dateUtils';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface ChatListProps {
  navigation: NavigationProp<ParamListBase>;
}

type UserType = {
  phone_number: string;
  name: string;
};

const user: UserType = {
  phone_number: '08115566345',
  name: 'Fatahillah',
};

const ChatList: React.FC<ChatListProps> = ({navigation}) => {
  const [data, setData] = useState<any[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    apiGet<any[]>(endPoint.CHAT_ROOM)
      .then(response => {
        if (Array.isArray(response)) {
          setData(response);
        } else {
          console.error('API response is not an array:', response);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  };

  const lastMessages = (arr: any) => {
    if (arr.length > 0) {
      return arr[arr.length - 1];
    } else {
      return null;
    }
  };

  type truncateProps = {text: string; limit: number; style: any};
  const TruncateText = ({text, limit, style}: truncateProps) => {
    if (text.length <= limit) {
      return <Text style={style}>{text}</Text>;
    } else {
      const truncatedText = text.substring(0, limit) + '...';
      return <Text style={style}>{truncatedText}</Text>;
    }
  };

  type ItemProps = {dataItem: any};
  const Item = ({dataItem}: ItemProps) => {
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
                  : require('../../assets/group.png')
                : dataItem.users.profile_pic
                ? {uri: dataItem.users.profile_pic}
                : require('../../assets/personal.png')
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

  return (
    <SafeAreaView style={ChatListStyle.containerStyle}>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={ChatListStyle.loadingIndicator}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.room_id}
          renderItem={({item}) => <Item dataItem={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ChatList;
