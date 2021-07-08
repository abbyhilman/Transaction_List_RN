import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textTitle: {
    fontWeight: 'bold',
  },
  idTitle: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(52, 52, 52, 0.1)',
  },
  detailText: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(52, 52, 52, 0.2)',
  },
  sectionBankName: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  sectionAcctNumber: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  sectionNewsTransfer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
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
