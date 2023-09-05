import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {apiGet} from '../../api/api';
import * as endPoint from '../../api/endPoint';
import {ChatListStyle} from '../../styles/ChatListStyles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import ChatListItem from '../../components/ChatListItem';

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
          renderItem={({item}) => (
            <ChatListItem dataItem={item} navigation={navigation} user={user} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ChatList;
