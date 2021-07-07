import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const DetailTransaction = ({navigation, route}) => {
  const data = route.params;
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let dataResponse = [];
    for (var key in data) {
      data[key].parent = key;
      dataResponse.push(data[key]);
      setDetail(dataResponse);
      setLoading(false);
    }
  }, []);

  function getParsedDate(strDate) {
    var strSplitDate = String(strDate).split(' ');
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    var date = new Date(strSplitDate[0]);
    var dd = date.getDate();
    var mm = months[date.getMonth()];

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    date = dd + ' ' + mm + ' ' + yyyy;
    return date.toString();
  }

  return (
    <SafeAreaView>
      {!loading ? (
        <FlatList
          data={detail}
          style={{marginTop: 10}}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <View
                style={{
                  backgroundColor: '#fff',
                  flex: 1,
                  flexDirection: 'row',
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(52, 52, 52, 0.1)',
                }}>
                <Text style={styles.textTitle}>ID TRANSAKSI: #{item.id}</Text>
                <Image
                  source={require('../../components/icon/copy.png')}
                  style={styles.ImageStyle}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(52, 52, 52, 0.2)',
                }}>
                <Text style={styles.textTitle}>DETAIL TRANSAKSI</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{color: '#ff6500', fontWeight: '500'}}>
                    Tutup
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: '#fff',
                  flex: 1,
                  flexDirection: 'column',
                  padding: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.bankText}>{item.beneficiary_bank}</Text>
                  <Text style={{alignSelf: 'center', marginRight: 5}}>
                    &#10132;
                  </Text>
                  <Text style={styles.bankText}>{item.sender_bank}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textTitle}>
                      {item.beneficiary_name}
                    </Text>
                    <Text>{item.account_number}</Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textTitle}>NOMINAL</Text>
                    <Text>
                      Rp
                      {new Intl.NumberFormat(['ban', 'id']).format(item.amount)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textTitle}>BERITA TRANSFER</Text>
                    <Text>{item.remark}</Text>
                  </View>
                  <View style={{flexDirection: 'column', marginRight: 7}}>
                    <Text style={styles.textTitle}>KODE UNIK</Text>
                    <Text>{item.unique_code}</Text>
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={styles.textTitle}>WAKTU DIBUAT</Text>
                  <Text>{getParsedDate(item.created_at)}</Text>
                </View>
              </View>
            </View>
          )}
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
  textTitle: {
    fontWeight: 'bold',
  },
  ImageStyle: {
    height: 15,
    width: 15,
    resizeMode: 'stretch',
    alignItems: 'center',
    tintColor: '#ff6500',
    marginLeft: 5,
  },
  bankText: {
    fontWeight: 'bold',
    marginRight: 5,
    textTransform: 'capitalize',
    fontSize: 18,
  },
});

export default DetailTransaction;
