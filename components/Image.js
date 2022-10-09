import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import propTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`;
const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.logoColor};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;
const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imageButtonBackground};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;
const Image = ({ url, imageStyle, rounded, showButton, onChangeImage }) => {
  
  const _handleEditButton = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (e) {
      Alert.alert('Photo Error', e.message);
    }
  };

  return (
    <Container>
      <StyledImage source={{ uri: url }} style={imageStyle} rounded={rounded} />
      {showButton && <PhotoButton onPress={_handleEditButton} />}
    </Container>
  );
};
const ButtonIcon = styled(Ionicons).attrs({
  name: 'camera-outline',
  size: 22,
})`
  color: ${({ theme }) => theme.imageButtonIcon};
`;
const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

Image.defaultProps = {
  rounded: false,
  showButton: false,
  onChangeImage: () => {},
};

Image.propTypes = {
  uri: propTypes.string,
  imageStyle: propTypes.object,
  rounded: propTypes.bool,
  showButton: propTypes.bool,
  onChangeImage: propTypes.func,
};
export default Image;
