import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransactionScreen, DetailTransaction} from '../pages';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailTransaction"
        component={DetailTransaction}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Route;
