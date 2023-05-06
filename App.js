import React, {useState} from 'react';
import LotteryNavigation from './src/Navigation/LotteryNavigation';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import AppLoading from 'expo-app-loading';
import numbersReducer from './src/store/Reducers/numbersReducer';
import useFonts from './src/hooks/useFonts';

const rootReducer = combineReducers({
  data: numbersReducer,
});

const store = configureStore({reducer: rootReducer});

const App = () => {
  const [IsReady, SetIsReady] = useState(false);

  //To load the fonts when app starts
  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <Provider store={store}>
      <LotteryNavigation />
    </Provider>
  );
};

export default App;
