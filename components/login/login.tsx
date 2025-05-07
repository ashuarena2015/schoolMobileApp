/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  // SafeAreaView,
  Image,
} from 'react-native';

import { AppDispatch } from '../../services/store';
import { useSelector, useDispatch } from 'react-redux';

function Login({ navigation }): React.JSX.Element {

  const appBasicInfo = useSelector((state: any) => state.users);

  const [formInput, setFormInput] = useState({
      email: '',
      password: '',
  });

  const handlChange = (name: string, value: string) => {
      setFormInput((prevState) => ({
          ...prevState,
          [name]: value,
      }));
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    const response = await dispatch({
      type: 'apiRequest',
      payload: {
        url: 'http://localhost:3001/api/user/login',
        method: 'POST',
        onError: 'GLOBAL_MESSAGE',
        dispatchType: 'userLogin',
        body: {
          userInfo: {
            email: formInput?.email,
            password: formInput?.password,
          }
        }
      },
    }) as unknown as { isLogin: boolean };
    if(response?.isLogin) {
      navigation.navigate('Home');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.sectionContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.flexContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.heading1}>{appBasicInfo?.loginUser?.firstName} {appBasicInfo?.loginUser?.lastName}</Text>
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={require('../../public/assets/logo.png')}
                width={200}
              />
            </View>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder="Enter your email"
              placeholderTextColor="#999"
              onChangeText={(text: string) => handlChange('email', text)}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              onChangeText={(text: string) => handlChange('password', text)}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <Text>Not registered?</Text>
              <Text onPress={() => navigation.navigate('Home')}> Create an account.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 66,
    height: 58,
  },
  heading1: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 20,
  },
  sectionContainer: {
    flexGrow: 1,
    // padding: '5%',
    // backgroundColor: '#F3C623',
  },
  flexContainer: {
    justifyContent: 'center',
    minHeight: '100%',
  },
  formContainer: {
    padding: 16,
    gap: 16,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#948979',
    padding: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  primaryBtn: {
    backgroundColor: '#10375C',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;
