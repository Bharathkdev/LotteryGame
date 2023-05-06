import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddPlayScreen from '../screens/AddPlayScreen';
import NumberSelectionScreen from '../screens/NumberSelectionScreen';

const Stack = createStackNavigator();

const LotteryNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddPlay">
        <Stack.Screen
          name="AddPlay"
          component={AddPlayScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NumberSelection"
          component={NumberSelectionScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LotteryNavigation;
