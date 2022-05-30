import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {
  const { signIn, loadingAuth } = useContext(AuthContext)


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (email === '' || password === '') {
      return;
    }

    await signIn({ email, password })
  }

    return(
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../../assets/joaopizza.png')}
          />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Digite seu email"
              placeholderTextColor={'#f0f0f0'}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor={'#f0f0f0'}
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              { loadingAuth? (
                <ActivityIndicator size={25} color="#fff" />
              ) : (
                <Text style={styles.btnText}>Acessar</Text>
              )}
            </TouchableOpacity>
          </View>

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    justifyContent: 'center',
    alignItems :'center',
  },
  logo: {
    height: 335,
    marginBottom: 18,
  },
  inputContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 12,
  },
  input: {
    width: '95%',
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101026',
    color: '#fff',
    borderRadius: 4,
    borderWidth: 0.4,
    borderColor: '#8a8a8a'
  },
  button: {
    width: '95%',
    height: 40,
    backgroundColor: '#3ff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026',
  }
});