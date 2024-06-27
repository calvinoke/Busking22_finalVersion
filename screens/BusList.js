import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.apiUrl;


//const API_BASE_URL = 'http://localhost:8000/api';

const BusListScreen = ({ route, navigation }) => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  useEffect(() => {
    if (route.params?.updatedBus) {
      setBuses((prevBuses) =>
        prevBuses.map((bus) =>
          bus.id === route.params.updatedBus.id ? route.params.updatedBus : bus
        )
      );
    }
  }, [route.params?.updatedBus]);

  const fetchBuses = async () => {
    try {
      const response = await axios.get(`${API_URL}/buses`);
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/buses/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchBuses(); // Refresh the list of buses after deletion
      Alert.alert('Success', 'Bus deleted successfully');
    } catch (error) {
      console.error('Error deleting bus:', error);
      Alert.alert('Error', 'Failed to delete bus');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>Price: {item.price}</Text>
      <Text>Departure: {item.departure_time}</Text>
      <Text>Arrival: {item.arrival_time}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UpdateBus', { id: item.id })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Bus" onPress={() => navigation.navigate('CreateBus')} />
      <FlatList
        data={buses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default BusListScreen;