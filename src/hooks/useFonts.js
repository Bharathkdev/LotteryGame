import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    poppinsBlack: require('../../assets/fonts/Poppins-Black.ttf'),
    poppinsBlackItalic: require('../../assets/fonts/Poppins-BlackItalic.ttf'),
    poppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    poppinsBoldItalic: require('../../assets/fonts/Poppins-BoldItalic.ttf'),
    poppinsExtraBold: require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    poppinsExtraBoldItalic: require('../../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    poppinsExtraLight: require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    poppinsExtraLightItalic: require('../../assets/fonts/Poppins-ExtraLightItalic.ttf'),
    poppinsItalic: require('../../assets/fonts/Poppins-Italic.ttf'),
    poppinsLight: require('../../assets/fonts/Poppins-Light.ttf'),
    poppinsLightItalic: require('../../assets/fonts/Poppins-LightItalic.ttf'),
    poppinsMedium: require('../../assets/fonts/Poppins-Medium.ttf'),
    poppinsMediumItalic: require('../../assets/fonts/Poppins-MediumItalic.ttf'),
    poppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
    poppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
    poppinsSemiBoldItalic: require('../../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    poppinsThin: require('../../assets/fonts/Poppins-Thin.ttf'),
    poppinsThinItalic: require('../../assets/fonts/Poppins-ThinItalic.ttf'),
  });
