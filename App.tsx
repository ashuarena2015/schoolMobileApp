/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './services/store';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
// import Auth from './auth';
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from './components/login/login';
import Home from './components/home/home';

function App(): React.JSX.Element {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#F1EFEC', // light gray or any color
      primary: 'blue',
      text: 'black',
    },
  };

  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* <Login /> */}
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#143D60', // header background
              },
              headerTintColor: '#ffffff', // header text color
            }}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: 'Login'}}
            />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  );
}

export default App;
