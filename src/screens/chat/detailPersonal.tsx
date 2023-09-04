import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {PersonalDetailStyle} from '../../styles/PersonalDetailStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const PersonalDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data}: any = route.params;
  return (
    <View style={PersonalDetailStyle.containerStyle}>
      <View style={PersonalDetailStyle.headerStyle}>
        <View style={PersonalDetailStyle.subHeadStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={16} color={'#000'} />
          </TouchableOpacity>
          <Image
            source={
              data.users.profile_pic
                ? {uri: data.users.profile_pic}
                : require('../../assets/personal.png')
            }
            style={PersonalDetailStyle.imagesItemStyle}
          />
          <MaterialIcon name="dots-vertical" size={16} color={'#000'} />
        </View>
        <View style={PersonalDetailStyle.contactStyle}>
          <Text style={PersonalDetailStyle.nameStyle}>{data.users.name}</Text>
          <Text style={PersonalDetailStyle.labelStyle}>
            {data.users.phone_number}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PersonalDetail;
