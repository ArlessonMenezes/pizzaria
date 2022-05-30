import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { api } from '../../services/api';

export default function Dashboard() {

  const [number, setNumber] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  async function openOrder() {
    if (number === '') {
      return;
    }

    const response = await api.post('/order', {
      table: Number(number)
    })

    //console.log(response.data);
    navigation.navigate("Order", { number: number, order_id: response.data.id })
    setNumber('')
  }

  return(
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Novo Pedido</Text>
      <TextInput
        style={styles.input}
        placeholder="Número da mesa"
        placeholderTextColor='#f0f0f0'
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={ openOrder }>
        <Text style={styles.txtButton}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#1d1d2e',
    justifyContent: 'center',
    alignItems :'center',
  },
  title: {
    color: '#fff',
    fontSize: 35,
    marginBottom: 25,
  },
  input: {
    height: 60,
    width: '90%',
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 22,
    color: '#fff',
    borderWidth: 0.4,
    borderColor: '#8a8a8a'
  },
  button: {
    width: '90%',
    height: 40,
    marginVertical: 12,
    backgroundColor: '#3ff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026',
  }
})