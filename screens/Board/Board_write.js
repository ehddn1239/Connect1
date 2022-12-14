import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Picker } from '@react-native-picker/picker'; //선택박스 만들기
import { addText} from '../../utils/firebase';

const Board_write = ({ navigation }) => {
  const [category, setCategory] = useState(''); //카테고리
  const [imageUrl, setImageUrl] = useState(null); // 이미지 주소
  const [photoUrl, setPhotoUrl] = useState(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions(); //권한 요청을 위한 hooks
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const nowTime = () => {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();

    return year + '-' + month + '-' + day;
  };
  const date = nowTime();
  let gsp = '';
  if (category == 'Free') {
    gsp = '자유게시판';
  } else if (category == 'Competition') {
    gsp = '공모전게시판';
  } else if (category == 'Club') {
    gsp = '동아리게시판';
  } else if (category == 'Hobby') {
    gsp = '취미게시판';
  }
  

  const pickImage = async () => {
    // 권한 확인 코드: 권한이 없으면 물어보고, 승인하지 않으면 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    // 이미지 업로드 기능
    const imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    if (imageData.cancelled) {
      return null; //이미지 업로드 취소
    }

    console.log(imageData);
    setImageUrl(imageData.uri);

    //파이어베이스 스토리지 업로드
    let uri = imageData.uri;
    const filename = imageData.uri.split('/').pop();
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const reference = firebase
      .storage()
      .ref()
      .child('images/' + filename);
    await reference
      .put(blob)
      .then(() => {
        console.log('성공');
      })
      .catch(error => {
        console.log(error);
      });

    //이미지 다운로드 url
    await reference
      .getDownloadURL()
      .then(url => {
        console.log(url);
        setPhotoUrl(url);
        Alert.alert("업로드 성공", "완료");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flexDirection: 'column',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View/>
      <View
        style={{
          backgroundColor: '#ffffff',
        }}
      >
        <View
          style={{
            marginTop: 3,
            marginHorizontal: 5,
          }}
        >
          <Picker
            selectedValue={category}
            onValueChange={(value, index) => setCategory(value)}
            mode="dropdown" // Android only
            style={{
              width: 165,
            }}
          >
            <Picker.Item label="카테고리 선택" value="" />
            <Picker.Item label="자유 " value="Free" />
            <Picker.Item label="공모전 " value="Competition" />
            <Picker.Item label="동아리" value="Club" />
            <Picker.Item label="취미" value="Hobby" />
          </Picker>
        </View>
        <View/>
        <TextInput
          placeholder={'제목'}
          style={{
            padding: 10,
            height: 50,
            marginLeft: 5,
            borderBottomColor: '#CBD0D8',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
          value={title}
          onChangeText={text => setTitle(text)}
        />

        <TouchableOpacity
          style={{
            marginTop: 5,
            padding: 5,
            marginLeft: 5,
            flexDirection: 'row',
          }}
          onPress={pickImage}
        >
          <AntDesign name="picture" size={30} color="green" />
          <Text
            style={{
              marginTop: 3,
              marginHorizontal: 5,
            }}
          >
            {' '}
            사진{' '}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: '#CBD0D8',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <TextInput
            placeholder={'내용을 입력해주세요.'}
            style={{
              backgroundColor: '#ffffff',
              right: 5,
              height: 50,
            }}
            value={content}
            multiline={true}
            onChangeText={text => setContent(text)}
          />
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 400, height: 400 }} // 이미지 크기
          />
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: 10,
            justifyContent: 'center',
            backgroundColor: '#ffffff',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              addText({navigation,category,title,content,timestamp,date,photoUrl,gsp});
            }}
            style={{
              marginTop: 50,
              borderRadius: 20,
              backgroundColor: '#485460',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginHorizontal: 60,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              등록
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Board_write;
