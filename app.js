import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://dummyjson.com/products?limit=100',
      );
      setProducts(response?.data?.products);
      setSortedProducts(response.data?.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const sortProducts = sortingOption => {
    let sorted = [...products];
    console.log('sorted', sorted);
    if (sortingOption === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortingOption === 'discount') {
      sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else if (sortingOption === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    }
    setSortedProducts(sorted);
    setSortBy(sortingOption);
  };

  const renderItem = ({item}) => (
    <View style={styles.productItem}>
      <Text style={{color: 'red'}}>{item.name}</Text>
      <Text>Price: {item.price}</Text>
      <Text>category: {item.category}</Text>
      <Text>Rating: {item.rating}</Text>
      <Text>Discount: {item.discountPercentage}%</Text>
      {item.stock < 50 && (
        <Text style={styles.stockMessage}>Hurry! Only a few items left</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sortButtons}>
        <Button title="Rating" onPress={() => sortProducts('rating')} />
        <Button title="Discount" onPress={() => sortProducts('discount')} />
        <Button title="Price" onPress={() => sortProducts('price')} />
      </View>
      {/* {console.log(sortedProducts?.products)} */}
      <FlatList
        data={sortedProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    // marginBottom: 10,
  },
  productItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  stockMessage: {
    color: 'red',
  },
});

export default App;
