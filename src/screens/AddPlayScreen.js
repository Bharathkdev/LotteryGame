import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Constants from 'expo-constants';
import {CustomButton} from '../common/components/CustomButton';
import strings from '../common/Strings';
import {useDispatch, useSelector} from 'react-redux';
import * as NumbersActions from '../store/Actions/numbersActions';
import colors from '../common/Colors';
import CustomAlert from '../common/components/CustomAlert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultLight,
  },
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: colors.primary,
  },
  header: {
    backgroundColor: colors.primary,
  },
  addPlayView: {
    alignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(24),
    textAlign: 'center',
    fontFamily: 'poppinsSemiBold',
    marginTop: moderateScale(50),
    marginBottom: moderateScale(30),
    color: colors.defaultLight,
  },
  buttonContainer: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? moderateScale(40) : moderateScale(20),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listView: {
    marginTop: moderateScale(20),
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(12),
    marginHorizontal: moderateScale(19),
    backgroundColor: colors.secondary,
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  numberCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.defaultLight,
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    margin: moderateScale(5),
  },
  numberText: {
    fontSize: moderateScale(22),
    fontFamily: 'poppinsSemiBold',
    color: colors.defaultDark,
    paddingTop: Platform.OS === 'android' ? moderateScale(5) : moderateScale(1),
  },
  deleteButtonContainer: {
    backgroundColor: colors.tertiary,
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(15),
  },
  deleteButtonText: {
    color: colors.defaultDark,
    fontSize: moderateScale(14),
    fontFamily: 'poppinsRegular',
  },
});

export default AddPlayScreen = ({navigation}) => {
  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);
  const [isMaxPickModalVisible, setIsMaxPickModalVisible] = useState(false);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const animationProgress = useRef(new Animated.Value(0)); //Ref for lottie animation

  //Animating lottie when purchase button is tapped
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        setIsConfettiVisible(false);
        animationProgress.current = new Animated.Value(0);
      }
    });
  }, [isConfettiVisible]);

  const dispatch = useDispatch();

  //Fetching data from global state(Redux)
  const selectedNumbersInStore = useSelector(
    state => state.data.selectedNumbers,
  );

  //Lottery picks to be displayed in the purchase modal
  const selected = selectedNumbersInStore
    .map(item => item.join(', '))
    .join('\n');

  //Deleting the lottery pick and updating the same in Redux
  const handleDelete = index => {
    dispatch(NumbersActions.deleteSelectedPick(index));
  };

  const handleAddPlay = () => {
    // Navigate to number selection screen
    if (selectedNumbersInStore.length < 3) {
      navigation.navigate('NumberSelection');
    } else {
      setIsMaxPickModalVisible(true);
    }
  };

  //Show modal with the selections
  const handlePurchase = () => {
    setIsConfettiVisible(true);
    setIsPurchaseModalVisible(true);
  };

  //UI to display the selected numbers inside circle with delete button
  const renderNumberRow = ({item, index}) => {
    return (
      <View key={index} style={styles.listItem}>
        <View style={styles.numberRow}>
          {item.map((number, i) => (
            <View key={i} style={styles.numberCircle}>
              <Text style={styles.numberText}>{number}</Text>
            </View>
          ))}
        </View>
        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity onPress={() => handleDelete(index)}>
            <Text style={styles.deleteButtonText}>
              {strings.AddPlay.deleteRow}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <StatusBar translucent barStyle="light-content" />
      </View>
      <View style={styles.header}>
        <Text style={styles.heading}>{strings.AddPlay.title}</Text>
      </View>
      <View style={styles.listView}>
        {selectedNumbersInStore.length > 0 && (
          <FlatList
            data={selectedNumbersInStore}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderNumberRow}
          />
        )}
      </View>
      <View style={styles.addPlayView}>
        <CustomButton title={strings.AddPlay.addPlay} onPress={handleAddPlay} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={strings.AddPlay.purchase}
          disableButton={selectedNumbersInStore.length === 0}
          onPress={handlePurchase}
          type="solid"
        />
      </View>
      <CustomAlert
        customAlertVisible={isPurchaseModalVisible || isMaxPickModalVisible}
        title={
          isPurchaseModalVisible
            ? strings.AddPlay.selectedNumbersTitle
            : strings.AddPlay.invalidActionTitle
        }
        message={
          isPurchaseModalVisible
            ? `${strings.AddPlay.selectedNumbersMsg}: \n${selected}`
            : strings.AddPlay.maxPicksMsg
        }
        handleCloseAlert={() => {
          if (isPurchaseModalVisible) {
            setIsPurchaseModalVisible(false);
          }
          if (isMaxPickModalVisible) {
            setIsMaxPickModalVisible(false);
          }
        }}
        showConfetti={isConfettiVisible}
      />
    </View>
  );
};
