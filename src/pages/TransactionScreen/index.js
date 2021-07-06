import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SearchBar from '../../components/SearchBar';
import {baseUrl} from '../../Rest';

const TransactionScreen = ({navigation}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(baseUrl)
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        let dataResponse = [];
        for (var key in json) {
          json[key].parent = key;
          dataResponse.push(json[key]);
          setData(dataResponse);
        }
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleSearch = text => {
    const newData = data.filter(item => {
      const itemData = `${item.beneficiary_name.toLowerCase()} ${
        item.sender_bank
      } ${item.beneficiary_bank} ${item.amount}`;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
    setSearch(text);
  };

  function getParsedDate(strDate) {
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + yyyy;
    return date.toString();
  }

  const trasanctionList = item => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderLeftWidth: 5,
          borderLeftColor:
            item.status.toLowerCase().toString() === 'success'
              ? '#1c9c3d'
              : item.status.toLowerCase().toString() === 'pending'
              ? '#ff6500'
              : '#fff',
          borderRadius: 5,
          backgroundColor: '#fff',
          margin: 8,
        }}
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate('DetailTransaction', {data: item});
        }}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text>{item.beneficiary_bank}</Text>
            <Text>&#10132;</Text>
            <Text>{item.sender_bank}</Text>
          </View>
          <Text>{item.beneficiary_name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>
              Rp{new Intl.NumberFormat(['ban', 'id']).format(item.amount)}
            </Text>
            <Text>&#8226;</Text>
            <Text>{getParsedDate(item.created_at)}</Text>
          </View>
        </View>

        <View
          style={
            item.status.toLowerCase().toString() === 'success'
              ? styles.button
              : item.status.toLowerCase().toString() === 'pending'
              ? styles.buttonTwo
              : styles.button
          }>
          <Text
            style={[
              styles.btnText,
              {
                color:
                  item.status.toLowerCase().toString() === 'success'
                    ? '#fff'
                    : item.status.toLowerCase().toString() === 'pending'
                    ? '#000'
                    : '#000',
              },
            ]}>
            {item.status.toLowerCase().toString() === 'success'
              ? 'Berhasil'
              : item.status.toLowerCase().toString() === 'pending'
              ? 'Pengecekan'
              : 'berhasil'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <SearchBar onChangeText={text => handleSearch(text)} onPress={() => {}} />
      {!loading ? (
        <FlatList
          data={data}
          style={{marginTop: -10}}
          keyExtractor={item => item.id}
          renderItem={({item}) => trasanctionList(item)}
        />
      ) : (
        <ActivityIndicator
          size={'large'}
          color={'#ff6500'}
          style={{marginTop: 40}}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1c9c3d',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
  },
  buttonTwo: {
    alignSelf: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ff6500',
  },
  btnText: {
    fontSize: 12,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default TransactionScreen;
