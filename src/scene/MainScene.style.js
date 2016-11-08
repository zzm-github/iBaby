import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  mainHeader: {
    paddingTop: 40,
    height: 190,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eaaac4'
  },
  mainHeaderImage: {
    marginBottom: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#f3d1df',
  },
  todayText: {
    color: 'white'
  },
  ageText: {
    marginTop: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mainState: {
    flex: 1,
    backgroundColor: '#f7d9e5',
    flexDirection: 'column',
    paddingTop: 12,
  },
  mainStateRow: {
    height: 40,
    flexDirection: 'row'
  },
  mainStateItem: {
    flex: 1,
    alignItems: 'center'
  },
  mainStateItemText: {
    flex: 1,
    width: 120,
    color: '#bf93a4',
    textAlign: 'justify',
    lineHeight: 40,
  },
});
