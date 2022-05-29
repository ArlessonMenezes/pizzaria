import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Feather, Entypo } from '@expo/vector-icons';
import { api } from '../../services/api';
import { ModalPicker }  from '../../components/ModalPicker';

type RouteDetailParams = {
  Order: {
    number: string;
    order_id: string;
  }
}

export type CategoryProps = {
  id: string;
  name: string;
}

type ProductsProps = {
  id: string;
  name: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function order() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
  const [modalCatgoryVisible, setmodalCatgoryVisible] = useState(false);

  const  [products, setProducts] = useState<ProductsProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductsProps | undefined>();
  const [productModalVisible, setProductModalVisible] = useState(false);

  const [amount, setAmount] = useState('1');

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get('category')
      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }

    loadInfo()
  }, [productSelected])

  useEffect(() => {

    async function loadingProducts() {
      const response = await api.get('/category/product', {
        params: {
          categody_id: categorySelected?.id,
        }
      })

      setProducts(response.data);
      setProductSelected(response.data[0])
    }

    loadingProducts();

  }, [categorySelected])


  async function handleCloseOrder() {
    try {

      await api.delete('/order', {
        params: {
          order_id: route.params?.order_id
        }
      })

      navigation.goBack();

    } catch(err) {

    }
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  return(
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>

        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name='trash-2' size={28} color="#ff3f4b"/>
        </TouchableOpacity>
      </View>

      { category.length !== 0 && (
          <TouchableOpacity style={styles.input} onPress={() => setmodalCatgoryVisible(true)}>
            <Text style={{ color: '#fff' }}>
              {categorySelected?.name}
            </Text>
          </TouchableOpacity>
      ) }

      { products.length !== 0 &&(
          <TouchableOpacity style={styles.input}>
            <Text style={{ color: '#fff' }}>
              {productSelected?.name}
            </Text>
          </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdTxt}>Quantidade</Text>
          <TextInput
            style={[styles.input, { width: '60%', textAlign: 'center' }]}
            placeholder='1'
            placeholderTextColor='#f0f0f0'
            keyboardType='numeric'
            value={ amount }
            onChangeText={setAmount}
        />
      </View>

      <View style={ styles.actions}>
        <TouchableOpacity style={styles.btnAdd}>
          <Entypo name="plus" size={33} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalCatgoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={ () => setmodalCatgoryVisible(false) }
          options={category}
          selectedItem={ handleChangeCategory }
        />
      </Modal>


      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24,

  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 14,
  },
  input: {
    backgroundColor: '#101026',
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    color: '#fff',
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#8a8a8a'
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtdTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  btnAdd: {
    width: '20%',
    backgroundColor: '#3fd1ff',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: '#3ff',
    borderRadius: 4,
    height: 40,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontWeight: 'bold',
    color: '#101026',
    fontSize: 18
  }
})