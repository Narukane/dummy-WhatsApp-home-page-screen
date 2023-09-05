import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import ChatListScreen from '../screens/chat/chatList';
import StatusListScreen from '../screens/status/statusList';
import CallListScreen from '../screens/call/callList';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {screenOptions} from '../styles/TabNavigatorStyles';
import {apiGet} from '../api/api';
import * as endPoint from '../api/endPoint';
import {HeaderStyle} from '../styles/HeaderStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {placeholderTextColor} from '../options/inputText';
import HomeItem from '../components/HomeItem';
interface HomeProps {
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

const Tab = createMaterialTopTabNavigator();

const HomeTab: React.FC<HomeProps> = ({navigation}) => {
  const [search, onPressSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
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
      });
  }, []);

  const filteredData = data
    ? data.filter(room =>
        room.messages.some((message: any) =>
          message.msg.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    : [];

  return (
    <>
      {!search && (
        <View style={HeaderStyle.containerStyle}>
          <Text style={HeaderStyle.labelStyle}>WhatsApp</Text>
          <View style={HeaderStyle.iconContainerStyle}>
            <TouchableOpacity style={HeaderStyle.iconStyle}>
              <Icon name="camera-outline" size={25} color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={HeaderStyle.iconStyle}
              onPress={() => onPressSearch(true)}>
              <MaterialIcon name="search" size={25} color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity style={HeaderStyle.iconStyle}>
              <Icon name="dots-vertical" size={25} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {search && (
        <View style={HeaderStyle.containerSearchStyle}>
          <View style={HeaderStyle.inputContainerStyle}>
            <TouchableOpacity
              style={HeaderStyle.iconStyle}
              onPress={() => onPressSearch(false)}>
              <MaterialIcon name="arrow-back" size={18} color={'#000'} />
            </TouchableOpacity>
            <TextInput
              style={HeaderStyle.inputTextStyle}
              placeholder="Search..."
              placeholderTextColor={placeholderTextColor}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
          {searchQuery !== '' && (
            <FlatList
              data={filteredData}
              keyExtractor={item => item.room_id}
              renderItem={({item, index}) => (
                <HomeItem
                  dataItem={item}
                  index={index}
                  searchText={searchQuery}
                  navigation={navigation}
                  user={user}
                />
              )}
            />
          )}
        </View>
      )}
      {!search && (
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Chat" component={ChatListScreen} />
          <Tab.Screen name="Status" component={StatusListScreen} />
          <Tab.Screen name="Call" component={CallListScreen} />
        </Tab.Navigator>
      )}
    </>
  );
};

export default HomeTab;
