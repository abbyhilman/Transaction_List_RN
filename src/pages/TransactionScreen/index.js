import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import SearchBar from '../../components/SearchBar';
import {baseUrl} from '../../Rest';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const TransactionScreen = ({navigation}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const chooseSort = [
    'URUTKAN',
    'Nama A-Z',
    'Nama Z-A',
    'Tanggal TerBaru',
    'Tanggal Terlama',
  ];
  const [pickerTitle, setPickerTitle] = useState(chooseSort[0]);
  const [select, setSelect] = useState(true);
  const [selectSort, setSelectSort] = useState(false);
  const [selectDesc, setSelectDesc] = useState(false);
  const [selectNew, setSelectNew] = useState(false);
  const [selectLast, setSelectLast] = useState(false);

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
    if (data !== undefined) {
      setSearch(
        data.filter(item => {
          const itemData = `${item.beneficiary_name.toLowerCase()} ${
            item.sender_bank
          } ${item.beneficiary_bank} ${item.amount}`;
          const textData = text.toLowerCase();
          return itemData.indexOf(textData) > -1;
        }),
      );
    } else {
      setSearch([]);
    }
  };

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
    var mm = months[date.getMonth()]; //January is 0!

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

  const dotSelected = () => {
    setSelect(!select);
    setSelectDesc(false);
    setSelectNew(false);
    setSelectLast(false);
    setSelectSort(false);
    setModalVisible(!modalVisible);
    setPickerTitle(chooseSort[0]);
    data.sort(function (a, b) {
      if (a.beneficiary_name > b.beneficiary_name) {
        return 0;
      }
      if (b.beneficiary_name > a.beneficiary_name) {
        return 0;
      }
      return 0;
    });
  };

  const dotSelectedSort = () => {
    setSelect(false);
    setSelectDesc(false);
    setSelectNew(false);
    setSelectLast(false);
    setSelectSort(!selectSort);
    setModalVisible(!modalVisible);
    setPickerTitle(chooseSort[1]);

    data.sort(function (a, b) {
      if (a.beneficiary_name > b.beneficiary_name) {
        return 1;
      }
      if (b.beneficiary_name > a.beneficiary_name) {
        return -1;
      }
      return 0;
    });
  };

  const dotSelectedDecending = () => {
    setSelect(false);
    setSelectDesc(!selectDesc);
    setSelectNew(false);
    setSelectLast(false);
    setSelectSort(false);
    setModalVisible(!modalVisible);
    setPickerTitle(chooseSort[2]);

    data.sort(function (a, b) {
      if (a.beneficiary_name > b.beneficiary_name) {
        return -1;
      }
      if (b.beneficiary_name > a.beneficiary_name) {
        return 1;
      }
      return 0;
    });
  };

  const dotSelectedNewDate = () => {
    setSelect(false);
    setSelectDesc(false);
    setSelectNew(!selectNew);
    setSelectLast(false);
    setSelectSort(false);
    setModalVisible(!modalVisible);
    setPickerTitle(chooseSort[3]);

    data.sort(function (a, b) {
      if (getParsedDate(a.created_at) > getParsedDate(b.created_at)) {
        return -1;
      }
      if (getParsedDate(b.created_at) > getParsedDate(a.created_at)) {
        return 1;
      }
      return 0;
    });
  };

  const dotSelectedLastDate = () => {
    setSelect(false);
    setSelectDesc(false);
    setSelectNew(false);
    setSelectLast(!selectLast);
    setSelectSort(false);
    setModalVisible(!modalVisible);
    setPickerTitle(chooseSort[4]);

    data.sort(function (a, b) {
      if (getParsedDate(a.created_at) > getParsedDate(b.created_at)) {
        return 1;
      }
      if (getParsedDate(b.created_at) > getParsedDate(a.created_at)) {
        return -1;
      }
      return 0;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        onChangeText={text => handleSearch(text)}
        onPress={() => setModalVisible(true)}
        sortTextTitle={pickerTitle}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => dotSelected()}>
                <Image
                  source={
                    select
                      ? require('../../components/icon/dot-circle-o.png')
                      : require('../../components/icon/circle-o.png')
                  }
                  style={styles.iconCircle}
                />
                <Text style={{marginLeft: 10}}>{chooseSort[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  dotSelectedSort();
                }}>
                <Image
                  source={
                    selectSort
                      ? require('../../components/icon/dot-circle-o.png')
                      : require('../../components/icon/circle-o.png')
                  }
                  style={styles.iconCircle}
                />
                <Text style={{marginLeft: 10}}>{chooseSort[1]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  dotSelectedDecending();
                }}>
                <Image
                  source={
                    selectDesc
                      ? require('../../components/icon/dot-circle-o.png')
                      : require('../../components/icon/circle-o.png')
                  }
                  style={styles.iconCircle}
                />
                <Text style={{marginLeft: 10}}>{chooseSort[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  dotSelectedNewDate();
                }}>
                <Image
                  source={
                    selectNew
                      ? require('../../components/icon/dot-circle-o.png')
                      : require('../../components/icon/circle-o.png')
                  }
                  style={styles.iconCircle}
                />
                <Text style={{marginLeft: 10}}>{chooseSort[3]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  dotSelectedLastDate();
                }}>
                <Image
                  source={
                    selectLast
                      ? require('../../components/icon/dot-circle-o.png')
                      : require('../../components/icon/circle-o.png')
                  }
                  style={styles.iconCircle}
                />
                <Text style={{marginLeft: 10}}>{chooseSort[4]}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {!loading ? (
        search ? (
          <FlatList
            data={search}
            style={{marginTop: -10}}
            keyExtractor={item => item.id}
            renderItem={({item}) => trasanctionList(item)}
          />
        ) : (
          <FlatList
            data={data}
            style={{marginTop: -10}}
            keyExtractor={item => item.id}
            renderItem={({item}) => trasanctionList(item)}
          />
        )
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
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? STATUSBAR_HEIGHT : null,
  },
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  iconCircle: {width: 12, height: 12, tintColor: '#ff6500'},
});

export default TransactionScreen;
