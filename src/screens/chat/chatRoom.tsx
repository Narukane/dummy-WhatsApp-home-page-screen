import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, TextInput} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ChatRoomStyle} from '../../styles/ChatRoomStyles';
import {formatTimeString} from '../../options/timeUtils';
import {getRandomHexColor} from '../../options/randomColor';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ReactionProvider, Reaction} from 'react-native-reactions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {placeholderTextColor} from '../../options/inputText';

interface ChatRoomProps {
  navigation: NavigationProp<ParamListBase>;
}

interface EmojiItemProp {
  id: number;
  emoji: React.ReactNode | string | number;
  title: string;
}
const ReactionItems = [
  {
    id: 0,
    emoji: '😇',
    title: 'like',
  },
  {
    id: 1,
    emoji: '🥰',
    title: 'love',
  },
  {
    id: 2,
    emoji: '🤗',
    title: 'care',
  },
  {
    id: 3,
    emoji: '😘',
    title: 'kiss',
  },
  {
    id: 4,
    emoji: '😂',
    title: 'laugh',
  },
  {
    id: 5,
    emoji: '😎',
    title: 'cool',
  },
];

const ChatRoom: React.FC<ChatRoomProps> = ({navigation}) => {
  const route = useRoute();
  const {user}: any = route.params;
  const {group}: any = route.params;
  let {data: tmp}: any = route.params;
  const [data, setData] = useState(tmp);
  const [isScrollEnable, setIsScrollEnable] = useState(true);
  const [selectedEmojis, setSelectedEmojis] = useState<{
    [key: string]: EmojiItemProp | undefined;
  }>({});

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

  const getUserColor = (phoneNumber: string) => {
    return userColors[phoneNumber];
  };

  const [text, onChangeText] = useState<string>('');

  type ItemProps = {
    dataItem: any;
    index: number;
    selectedEmoji?: EmojiItemProp;
    setSelectedEmoji?: (e: EmojiItemProp | undefined) => void;
    onShowDismissCard?: (e?: boolean) => void;
    isScrollEnable?: boolean;
  };
  const Item = ({dataItem, index, onShowDismissCard}: ItemProps) => {
    const left: boolean = dataItem.from.phone_number !== user.phone_number;
    const time = formatTimeString(dataItem.timestamp);
    const selectedEmoji = selectedEmojis[index];

    return (
      <TouchableOpacity>
        <View
          style={[
            left
              ? ChatRoomStyle.messageContainerStyleLeft
              : ChatRoomStyle.messageContainerStyleRight,
            selectedEmoji ? ChatRoomStyle.emojiContainerStyle : null,
          ]}>
          {left && group && (
            <Image
              source={
                dataItem.from.profile_pic
                  ? {uri: dataItem.from.profile_pic}
                  : require('../../assets/personal.png')
              }
              style={ChatRoomStyle.imagesItemStyle}
            />
          )}
          <View
            style={
              left
                ? ChatRoomStyle.messageStyleLeft
                : ChatRoomStyle.messageStyleRight
            }>
            <Reaction
              type="modal"
              items={ReactionItems}
              onTap={emoji => {
                setSelectedEmojis(prevSelectedEmojis => ({
                  ...prevSelectedEmojis,
                  [index]: emoji,
                }));
                onShowDismissCard && onShowDismissCard(false);
              }}
              itemIndex={index}
              onShowDismissCard={onShowDismissCard}>
              <View>
                {left && group && (
                  <Text
                    style={[
                      ChatRoomStyle.messageHeadLabelStyle,
                      {color: getUserColor(dataItem.from.phone_number)},
                    ]}>
                    {dataItem.from.name}
                  </Text>
                )}
                <Text style={ChatRoomStyle.messageLabelStyle}>
                  {dataItem.msg}
                </Text>
                <Text style={ChatRoomStyle.messageTimeLabelStyle}>{time}</Text>
              </View>
            </Reaction>
            {selectedEmoji && (
              <View style={ChatRoomStyle.emojiViewStyle}>
                <Text style={ChatRoomStyle.emojiViewLabelStyle}>
                  {selectedEmoji.emoji}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ReactionProvider>
      <>
        <View style={ChatRoomStyle.headingStyle}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={ChatRoomStyle.buttonBackStyle}>
            <Icon name="arrow-back" size={16} color={'#fff'} />
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
              <Item
                dataItem={item}
                index={index}
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
