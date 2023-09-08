import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {StatusListStyle} from '../../styles/StatusListStyles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import StatusListItem from '../../components/StatusListItem';

interface StatuProps {
  navigation: NavigationProp<ParamListBase>;
}

const StatusList: React.FC<StatuProps> = ({navigation}) => {
  const [data, setData] = useState<any[] | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const res = [
      {
        id: '1',
        name: 'john doe',
        status: {
          text: 'Hi its me',
        },
        timestamp: '2023-08-05T10:46:00.000Z',
      },
      {
        id: '2',
        name: 'john doe 2',
        status: {
          text: 'Hi its me',
        },
        timestamp: '2023-08-05T10:46:00.000Z',
      },
    ];

    setData(res);
    setLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={StatusListStyle.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={StatusListStyle.loadingIndicator}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <StatusListItem dataItem={item} navigation={navigation} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default StatusList;
