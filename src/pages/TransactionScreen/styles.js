import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#3CB371',
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
  bankText: {
    fontWeight: 'bold',
    marginRight: 5,
    textTransform: 'capitalize',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    width: '80%',
    height: '30%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  contentModal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contectModalText: {marginLeft: 10, fontWeight: '500'},
  iconCircle: {width: 12, height: 12, tintColor: '#ff6500'},
});
