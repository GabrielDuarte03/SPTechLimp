import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  SafeAreaView,
  Button,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function App({navigation}) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  var emailRef = React.useRef();
  var senhaRef = React.useRef();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);

  
  const showAlert = x => {
    if (x == 2) setLoading(true);
  };
  const hideAlert = x => {
    if (x == 2) setLoading(false);
  };

  async function loginFirebase() {
      showAlert(2);
    if (email == '' || senha == '') {
      Alert.alert('Erro!', 'Preencha todos os campos!', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else {
      setEmail('');
      setSenha('');
      auth()
        .signInWithEmailAndPassword(email, senha)
        .then(() => {
          console.log('Logado');
          setEmail('');
          setSenha('');
          hideAlert(2);
          navigation.navigate('Home');
        })
        .catch(e => {
            hideAlert(2);
          Alert.alert('Erro!', 'Email ou senha incorretos!');
        });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: 'padding',
        android: null,
      })}
      style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/logo.jpg')}
          style={styles.logo}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.inputs}>
          <Text style={styles.label}>Email: </Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => senhaRef.current.focus()}
          />

          <Text style={styles.label}>Senha: </Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            ref={senhaRef}
            value={senha}
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            style={styles.input}
            secureTextEntry={secure}
            onChangeText={text => setSenha(text)}
            placeholder="Senha"
          />
           </View>
          <TouchableOpacity style={styles.loginButton} onPress={loginFirebase}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AwesomeAlert
        show={loading}
        title="Aguarde"
        message="Fazendo Login..."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showProgress={true}
        progressColor='#1F2A44'
        showConfirmButton={false}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#e0195c"
        cancelButtonColor="#e0195c"
        contentContainerStyle={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 10,
          borderColor: '#1F2A44',
          borderWidth: 1.5,
        }}
        contentStyle={{
          padding: 15,
        }}
        titleStyle={{
          fontSize: 20,
          fontFamily: 'Arial',
          color: '#1F2A44',
        }}
        messageStyle={{
          fontSize: 15,
          fontFamily: 'Arial',
          color: '#1F2A44',
        }}
        confirmButtonStyle={{
          borderRadius: 20,
          padding: 5,
          width: 100,
        }}
        cancelButtonStyle={{
          borderRadius: 20,
          padding: 5,
        }}
        confirmButtonTextStyle={{
          fontSize: 15,
          textAlign: 'center',
          fontFamily: 'Arial',
        }}
        cancelButtonTextStyle={{
          fontSize: 15,
          textAlign: 'center',
          fontFamily: 'Arial',
        }}
        onCancelPressed={() => hideAlert(2)}
        onConfirmPressed={() => hideAlert(2)}
      />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: Dimensions.get('window').height,
  },
  logo: {
    width: 220,
    height: 220,
  },
  inputs: {
    paddingBottom: 180,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
  },
  input: {
    width: 320,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 10,
    fontFamily: 'Arial',

    color: '#1F2A44',
  },
  label: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#1F2A44',
    fontSize: 15.4,
    marginLeft: 2.2,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: Dimensions.get('window').height - 250,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
  },
  loginButton: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width - 200,
    backgroundColor: '#E6005A',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 15,
    alignContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Arial',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
