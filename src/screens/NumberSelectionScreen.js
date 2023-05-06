import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from 'expo-constants';
import {useDispatch, useSelector} from 'react-redux';
import * as NumbersActions from '../store/Actions/numbersActions';
import {CustomButton} from '../common/components/CustomButton';
import strings from '../common/Strings';
import colors from '../common/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomAlert from '../common/components/CustomAlert';

//Getting the dimensions to display the number grid dynamically for respective screen sizes
const {width} = Dimensions.get('window');

const GRID_ITEM_MARGIN = 5;

const NUMBER_OF_COLUMNS = 7;

const itemWidth =
  (width - (NUMBER_OF_COLUMNS + 1) * GRID_ITEM_MARGIN) / NUMBER_OF_COLUMNS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultLight,
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: colors.primary,
  },
  titleView: {
    flexDirection: 'row',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
    alignItems: 'center',
    marginLeft: moderateScale(10),
  },
  titleText: {
    flex: 1,
    fontSize: moderateScale(24),
    color: colors.defaultLight,
    fontFamily: 'poppinsSemiBold',
    textAlign: 'center',
    paddingRight: 30,
  },
  subTitleText: {
    textAlign: 'left',
    fontFamily: 'poppinsSemiBold',
    fontSize: moderateScale(20),
    marginLeft: moderateScale(10),
  },
  header: {
    backgroundColor: colors.primary,
    marginBottom: moderateScale(20),
    alignItems: 'center',
  },
  gridContainer: {
    margin: 10,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  numberGrid: {
    paddingTop: moderateScale(10),
    paddingHorizontal: GRID_ITEM_MARGIN,
    paddingBottom: GRID_ITEM_MARGIN,
  },
  numberButton: {
    width: itemWidth,
    height: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateScale(3),
  },
  selectedNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScale(16),
  },
  topCircleText: {
    color: colors.defaultDark,
    fontSize: moderateScale(20),
    fontFamily: 'poppinsSemiBold',
    paddingTop: Platform.OS === 'android' ? moderateScale(5) : moderateScale(2),
  },
  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(20),
  },
  circle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.defaultLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.circle,
    borderWidth: moderateScale(1),
    marginHorizontal: moderateScale(5),
  },
  circleSelected: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.defaultDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(5),
  },
  selectedNumbersText: {
    fontSize: moderateScale(17),
    fontFamily: 'poppinsMedium',
    paddingTop: Platform.OS === 'android' ? moderateScale(5) : moderateScale(1),
  },
  topCircle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: colors.defaultLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(5),
  },
  playNumbers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: Platform.OS === 'ios' ? moderateScale(40) : moderateScale(20),
  },
});

export default NumberSelectionScreen = ({navigation}) => {
  const [selectedNumbers, setSelectedNumbers] = useState(['', '', '', '', '']);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  //Fetching data from global state(Redux)
  const selectedNumbersInStore = useSelector(
    state => state.data.selectedNumbers,
  );

  //To handle when a user picks a single number
  const handleNumberSelect = number => {
    // Check if the number is already present in the array
    const alreadyExists = selectedNumbers.includes(number);

    const updatedNumbers = [...selectedNumbers];
    selectedNumbers.every((item, index) => {
      if (item === '' && !alreadyExists) {
        updatedNumbers[index] = number;
        return false;
      } else if (item === number) {
        updatedNumbers[index] = '';
        return false;
      }
      return true;
    });
    setSelectedNumbers(updatedNumbers);
  };

  //To handle when user play the numbers
  const handleAddNumbers = () => {
    // Check if the selected numbers are already in selectedSequences
    if (selectedNumbersInStore.length !== 0) {
      const alreadyExists = selectedNumbersInStore.some(
        selected => selected.join(',') === selectedNumbers.join(','),
      );

      if (alreadyExists) {
        setIsVisible(true);
        return;
      }
    }

    // Dispatch the action to add the selected numbers to the store and navigate to the next screen
    dispatch(NumbersActions.addSelectedPick(selectedNumbers));
    navigation.navigate('AddPlay');
  };

  //UI to display the selected number in the top cirles section
  const renderCircle = index => {
    return (
      <View style={styles.topCircle} key={index}>
        <Text style={styles.topCircleText}>{selectedNumbers[index]}</Text>
      </View>
    );
  };

  //UI to display the number grid from 1 to 42
  const renderItem = ({item}) => {
    const isSelected = selectedNumbers.includes(item);
    const textColor = isSelected ? colors.defaultLight : colors.defaultDark;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.numberButton}
        onPress={() => handleNumberSelect(item)}>
        <View style={isSelected ? styles.circleSelected : styles.circle}>
          <Text style={{...styles.selectedNumbersText, color: textColor}}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  //Disable Play Numbers button until 5 numbers are selected
  const isButtonDisabled = selectedNumbers.includes('');

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <StatusBar translucent barStyle="light-content" />
      </View>
      <View style={styles.header}>
        <View style={styles.titleView}>
          <Icon
            name="arrow-back"
            color={colors.defaultLight}
            size={moderateScale(25)}
            onPress={() => {
              navigation.navigate('AddPlay');
            }}
          />
          <Text style={styles.titleText}>{strings.NumberSelection.title}</Text>
        </View>
        <View style={styles.selectedNumbersContainer}>
          <View style={styles.circleContainer}>
            {[...Array(5)].map((_, index) => renderCircle(index))}
          </View>
        </View>
      </View>
      <View style={styles.gridContainer}>
        <Text style={styles.subTitleText}>
          {strings.NumberSelection.subTitle}
        </Text>
        <FlatList
          data={[...Array(42)].map((_, index) => index + 1)}
          numColumns={NUMBER_OF_COLUMNS}
          keyExtractor={item => item.toString()}
          contentContainerStyle={styles.numberGrid}
          columnWrapperStyle={styles.gridRow}
          renderItem={renderItem}
          getItemLayout={(data, index) => ({
            length: itemWidth + GRID_ITEM_MARGIN,
            offset: (itemWidth + GRID_ITEM_MARGIN) * index,
            index,
          })}
        />
      </View>
      <View style={styles.playNumbers}>
        <CustomButton
          title={strings.NumberSelection.playNumbers}
          disableButton={isButtonDisabled}
          onPress={handleAddNumbers}
          type="solid"
        />
      </View>
      <CustomAlert
        customAlertVisible={isVisible}
        title={strings.AddPlay.invalidActionTitle}
        message={strings.NumberSelection.repeatedSequenceMsg}
        handleCloseAlert={() => {
          setIsVisible(false);
        }}
      />
    </View>
  );
};
