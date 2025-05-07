/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { AppDispatch } from '../../services/store';
import Card from '../Card';
import StudentsList from '../Students/StudentsList';

const Home = ({ navigation }): React.JSX.Element => {

  const { loginUser, userCounter } = useSelector((state: any) => state.users);
  const infoRedux = useSelector((state: any) => state.users);
  console.log({ infoRedux });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!loginUser?.email) {
      navigation.navigate('Login');
    } else {
      Toast.show({
        type: 'info',
        text1: 'This is an info message',
      });
    }
  }, [loginUser?.email, navigation]);

    useEffect(() => {
      dispatch({
        type: 'apiRequest',
        payload: {
          url: 'http://localhost:3001/api/user/adminInfo',
          method: 'GET',
          onSuccess: 'users/adminInfo',
          onError: 'GLOBAL_MESSAGE',
          dispatchType: 'adminInfo',
        },
      });
    }, [dispatch]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.sectionContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* <Toast /> */}
        <View>
          {/* <Text style={styles.heading1}>Welcome {loginUser?.firstName} {loginUser?.lastName}</Text> */}
          <Card
            title={`Welcome, ${loginUser?.firstName} ${loginUser?.lastName}`}
            content={loginUser?.designation}
            image={`http://localhost:3001/uploads/${loginUser?.profilePhoto}`}
            customStyles={{ backgroundColor: '#fff' }}
            customStylesHeading1={{ fontSize: 22, fontWeight: '600', color: '#000' }}
            customStylesHeading2={{ fontSize: 16, fontWeight: '600', color: '#666', marginTop: 4 }}
          />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4 }}>
            <Card
              title="Students"
              content={userCounter?.students}
              image=""
              customStyles={{ backgroundColor: '#D3E671', width: '48%' }}
              customStylesHeading1={{ fontSize: 16, fontWeight: '600', color: '#000' }}
              customStylesHeading2={{ fontSize: 32, fontWeight: '600', color: '#000', marginTop: 4 }}
            />
            <Card
              title="Staffs"
              content={userCounter?.teachers}
              image=""
              customStyles={{ backgroundColor: '#F8ED8C', width: '48%'}}
              customStylesHeading1={{ fontSize: 16, fontWeight: '600', color: '#000' }}
              customStylesHeading2={{ fontSize: 32, fontWeight: '600', color: '#000', marginTop: 4 }}
            />
          </View>
          <StudentsList />
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
    color: '#000',
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: '5%',
  },
  sectionContainer: {
    flexGrow: 1,
    padding: '5%',
  },
  flexContainer: {
    justifyContent: 'center',
    alignContent: 'center',
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

export default Home;
