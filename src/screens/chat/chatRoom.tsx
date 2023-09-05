import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, TextInput} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ChatRoomStyle} from '../../styles/ChatRoomStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ReactionProvider} from 'react-native-reactions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {placeholderTextColor} from '../../options/inputText';
import ChatRoomItem from '../../components/ChatRoomItem';
import {getRandomHexColor} from '../../options/randomColor';

interface ChatRoomProps {
  navigation: NavigationProp<ParamListBase>;
}

const ChatRoom: React.FC<ChatRoomProps> = ({navigation}) => {
  const route = useRoute();
  const {user}: any = route.params;
  const {group}: any = route.params;
  let {data: tmp}: any = route.params;
  const [data, setData] = useState(tmp);
  const [isScrollEnable, setIsScrollEnable] = useState(true);

  const [userColors, setUserColors] = useState<{[phoneNumber: string]: string}>(
    {},
  );

  useEffect(() => {
    if (group) {
      const colors: {[phoneNumber: string]: string} = {};
      for (const userData of data.users) {
        const existingColor = userColors[userData.phone_number];
        if (!existingColor) {
          colors[userData.phone_number] = getRandomHexColor();
        }
      }

      if (Object.keys(colors).length > 0) {
        setUserColors(prevUserColors => ({
          ...prevUserColors,
          ...colors,
        }));
      }
    }
  }, [group, data, userColors]);

  const sendMessage = () => {
    if (text.trim() !== '') {
      const newMessage = {
        id: data.messages.length + 1,
        msg: text,
        timestamp: new Date().toString(),
        from: user,
      };

      setData((prevData: any) => ({
        ...prevData,
        messages: [...prevData.messages, newMessage],
      }));

      onChangeText('');
    }
  };

  const [text, onChangeText] = useState<string>('');

  return (
    <ReactionProvider>
      <>
        <View style={ChatRoomStyle.headingStyle}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={ChatRoomStyle.buttonBackStyle}>
            <Icon name="arrow-back" size={20} color={'#fff'} />
          </TouchableOpacity>

          <View style={ChatRoomStyle.headingButtonStyle}>
            <Image
              source={
                data?.group === true
                  ? data?.group_pic
                    ? {uri: data?.group_pic}
                    : require('../../assets/group.png')
                  : data?.users?.profile_pic
                  ? {uri: data?.users?.profile_pic}
                  : require('../../assets/personal.png')
              }
              style={ChatRoomStyle.imagesItemStyle}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(group ? 'Group' : 'Personal', {data})
              }>
              <View style={ChatRoomStyle.headingContainerStyle}>
                <Text style={ChatRoomStyle.headingLabelStyle}>
                  {data?.group === true ? data.group_name : data.users.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={ChatRoomStyle.containerStyle}>
          <FlatList
            data={data.messages}
            scrollEnabled={isScrollEnable}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <ChatRoomItem
                dataItem={item}
                index={index}
                user={user}
                group={group}
                userColors={userColors}
                onShowDismissCard={(e?: boolean) => setIsScrollEnable(!e)}
              />
            )}
          />
          <View style={ChatRoomStyle.sendContainerStyle}>
            <TextInput
              style={ChatRoomStyle.inputStyle}
              value={text}
              onChangeText={onChangeText}
              placeholderTextColor={placeholderTextColor}
              placeholder="Type Here"
              multiline={true}
            />
            <TouchableOpacity
              style={ChatRoomStyle.sendButtonStyle}
              onPress={() => sendMessage()}>
              <Icon name="send" size={15} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    </ReactionProvider>
  );
};

export default ChatRoom;
