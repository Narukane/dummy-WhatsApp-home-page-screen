import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {GroupDetailStyle} from '../../styles/GroupDetailStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const GroupDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data}: any = route.params;

  return (
    <View style={GroupDetailStyle.containerStyle}>
      <View style={GroupDetailStyle.headerStyle}>
        <View style={GroupDetailStyle.subHeadStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={16} color={'#000'} />
          </TouchableOpacity>
          <Image
            source={
              data.group_pic
                ? {uri: data.group_pic}
                : require('../../assets/group.png')
            }
            style={GroupDetailStyle.imagesItemStyle}
          />
          <MaterialIcon name="dots-vertical" size={16} color={'#000'} />
        </View>
        <View style={GroupDetailStyle.contactStyle}>
          <Text style={GroupDetailStyle.nameStyle}>{data.group_name}</Text>
          <Text>Group {data.users.length} participants</Text>
        </View>
      </View>
    </View>
  );
};

export default GroupDetail;
