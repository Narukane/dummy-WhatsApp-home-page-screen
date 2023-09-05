import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {ChatRoomStyle} from '../styles/ChatRoomStyles';
import {formatTimeString} from '../options/timeUtils';
import {Reaction} from 'react-native-reactions';

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

type UserType = {
  phone_number: string;
  name: string;
};

type UserColors = {
  [phoneNumber: string]: string;
};

type ItemProps = {
  dataItem: any;
  index: number;
  user: UserType;
  group: boolean;
  selectedEmoji?: EmojiItemProp;
  setSelectedEmoji?: (e: EmojiItemProp | undefined) => void;
  onShowDismissCard?: (e?: boolean) => void;
  isScrollEnable?: boolean;
  userColors: UserColors;
};
const ChatRoomItem = ({
  dataItem,
  index,
  onShowDismissCard,
  user,
  group,
  userColors,
}: ItemProps) => {
  const [selectedEmojis, setSelectedEmojis] = useState<{
    [key: string]: EmojiItemProp | undefined;
  }>({});

  const getUserColor = (phoneNumber: string) => {
    return userColors[phoneNumber];
  };

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
                : require('../assets/personal.png')
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

export default ChatRoomItem;
