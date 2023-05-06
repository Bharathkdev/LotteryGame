import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Modal from 'react-native-modal';
import {CustomButton} from './CustomButton';
import {moderateScale} from 'react-native-size-matters';
import LottieView from 'lottie-react-native';
import strings from '../Strings';
import colors from '../Colors';

const styles = StyleSheet.create({
  nameModal: {
    padding: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.defaultLight,
    borderRadius: moderateScale(10),
    height: moderateScale(225),
    overflow: 'hidden',
  },
  customButtonStyle: {
    width: '30%',
    height: moderateScale(40),
    alignSelf: 'center',
  },
  textStyle: {
    marginBottom: moderateScale(10),
    color: colors.defaultDark,
    textAlign: 'center',
  },
});

export default CustomAlert = ({
  customAlertVisible,
  handleCloseAlert,
  title,
  message,
  showConfetti,
}) => {
  return (
    <Modal
      isVisible={customAlertVisible}
      backdropTransitionOutTiming={0}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}>
      <View style={styles.nameModal}>
        <Text
          style={{
            ...styles.textStyle,
            fontFamily: 'poppinsSemiBold',
            fontSize: moderateScale(18),
          }}>
          {title}
        </Text>
        <Text
          style={{
            ...styles.textStyle,
            fontFamily: 'poppinsMedium',
            fontSize: moderateScale(16),
            paddingVertical: moderateScale(10),
          }}>
          {message}
        </Text>
        <CustomButton
          title={strings.AddPlay.ok}
          onPress={handleCloseAlert}
          buttonStyle={styles.customButtonStyle}
        />
      </View>
      {showConfetti && (
        //Show lottie only when purchase button is tapped
        <LottieView
          source={require('../../../assets/lottie/confetti.json')}
          autoPlay
          loop={false}
        />
      )}
    </Modal>
  );
};
