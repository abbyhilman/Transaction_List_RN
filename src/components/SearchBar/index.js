import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const SearchBar = ({onChangeText, onPress, sortTextTitle}) => {
  return (
    <View style={styles.SectionStyle}>
      <Image
        source={require('../icon/search.png')} //Change your icon image here
        style={styles.ImageStyle}
      />
      <TextInput
        style={{flex: 1, color: '#000'}}
        onChangeText={onChangeText}
        placeholderTextColor={'rgba(52, 52, 52, 0.8)'}
        placeholder="Cari nama,bank atau nominal"
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity style={styles.buttonModal} onPress={onPress}>
        <Text style={{color: '#ff6500', fontWeight: 'bold'}}>
          {sortTextTitle}
        </Text>
        <Image
          source={require('../icon/arrowdown.png')} //Change your icon image here
          style={styles.ArrowStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 50,
    borderRadius: 5,
    margin: 10,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    tintColor: '#C0C0C0',
  },
  buttonModal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ArrowStyle: {
    padding: 8,
    margin: 5,
    height: 12,
    width: 12,
    resizeMode: 'stretch',
    alignItems: 'center',
    tintColor: '#ff6500',
  },
});

export default SearchBar;
