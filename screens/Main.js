import firebase from 'firebase/app';
import 'firebase/auth';
import { Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// 아이콘 사용 import
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { CallBoard } from '../utils/firebase';
import { Linking } from 'react-native';
// 학교, 종정, 셔틀 링크 사용 import

const Container = styled.View`
  width: 60px;
  height: 60px;
  border-width: 2px;
  border-radius: 15px;
  margin: 10px;
  padding: 15px;
  background-color: #f4f3ea;
  border-color: #e6e7e8;
  margin-left: 30px;
  margin-top: 20px;
`;

const Top = styled.Text`
  font-size: 20px;
  margin-left: 25px;
  margin-top: 10px;
  font-family: 'NanumGothicBold';
`;

const Top2 = styled.Text`
  margin-top: 5px;
`;

const TextContainer = styled.View`
  width: 60px;
  height: 60px;
  border-width: 2px;
  border-radius: 40px;
  margin: 20px;
  margin-top: 10px;
  padding: 15px;
  background-color: #f4f3ea;
  border-color: #e6e7e8;
`;

const Main = ({ navigation }) => {
  const [freeBoard, setFreeBoard] = useState('');
  const [competitionBoard, setCompetitionBoard] = useState('');
  const [clubBoard, setClubBoard] = useState('');
  const [hobbyBoard, setHobbyBoard] = useState('');
  const [posts, setPosts] = useState(null);
  const isFocused = useIsFocused(); // isFoucesd Define



  CallBoard('Free', setFreeBoard);
  CallBoard('Competition', setCompetitionBoard);
  CallBoard('Club', setClubBoard);
  CallBoard('Hobby', setHobbyBoard);
  return (
    <ScrollView
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Notice', { screen: 'NotiSchool' })
          }
        >
          <TextContainer>
            <Entypo name="megaphone" size={24} color="red" />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 8,
              }}
            >
              공지
            </Text>
          </TextContainer>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.shinhan.ac.kr/sites/kr/index.do')
          }
        >
          <TextContainer>
            <Ionicons name="home-outline" size={24} color="#E2495B" />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 8,
              }}
            >
              학교
            </Text>
          </TextContainer>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://stins.shinhan.ac.kr/irj/portal')
          }
        >
          <TextContainer>
            <AntDesign name="earth" size={24} color="#0C4A60" />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 8,
              }}
            >
              종정시
            </Text>
          </TextContainer>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://shinhanunivst.modoo.at/?link=6n7lulzb&messageNo=108&mode=view&query=&queryType=0&myList=0&page=2'
            )
          }
        >
          <TextContainer>
            <Ionicons name="bus" size={24} color="#D3AC2B" />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: 8,
              }}
            >
              셔틀
            </Text>
          </TextContainer>
        </TouchableOpacity>
      </View>

      {/* 실시간 최신글 */}
      <Top></Top>
      <Text
        style={{
          fontSize: 20,
          marginLeft: 25,
          marginTop: 10,
          fontFamily: 'NanumGothicBold',
        }}
      >
        <Text> 최신글 </Text>
      </Text>

      <View
        style={{
          height: 160,
          borderColor: '#E6E7E8',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '자유게시판' })
          }
        >
          <View
            style={[
              {
                height: 35,
                marginHorizontal: 25,
                marginTop: 20,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 15,
              }}
            >
              자유 게시판 -
              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                  marginLeft: 15,
                }}
              >
                {freeBoard}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '공모전게시판' })
          }
        >
          <View
            style={{
              height: 35,
              marginHorizontal: 25,
            }}
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 15,
              }}
            >
              공모전 게시판 -
              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                  marginLeft: 15,
                }}
              >
                {competitionBoard}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '동아리게시판' })
          }
        >
          <View
            style={{
              height: 35,
              marginHorizontal: 25,
            }}
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 15,
              }}
            >
              동아리 게시판 -
              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                  marginLeft: 15,
                }}
              >
                {clubBoard}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('BoardStacks', { screen: '취미게시판' })
          }
        >
          <View
            style={{
              height: 35,
              marginHorizontal: 25,
            }}
          >
            <Text
              style={{
                fontFamily: 'NanumGothicBold',
                fontSize: 15,
              }}
            >
              취미 게시판 -
              <Text
                style={{
                  fontFamily: 'NanumGothic',
                  fontSize: 15,
                  marginLeft: 15,
                }}
              >
                {hobbyBoard}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 20,
          marginLeft: 25,
          marginTop: 10,
          fontFamily: 'NanumGothicBold',
        }}
      >
        <Text> 채팅방 </Text>
      </Text>
      {/* 채팅방 */}
      <View
        style={{
          height: 160,
          borderColor: '#E6E7E8',
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 10,
          margin: 10,
        }}
      ></View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 10,
        }}
      ></View>
    </ScrollView>
  );
};

export default Main;
