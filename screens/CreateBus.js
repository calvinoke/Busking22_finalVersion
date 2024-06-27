import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';

const API_URL = Constants.expoConfig.extra.apiUrl;

const CreateBus = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [departureTime, setDepartureTime] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);

  const handleSubmit = async () => {
    const formData = {
      name,
      price,
      departure_time: departureTime.toISOString(),
      arrival_time: arrivalTime.toISOString(),
    };

    try {
      await axios.post(`${API_URL}/buses/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Bus Created', 'The bus was successfully created.');
      navigation.navigate('BusList');
    } catch (error) {
      Alert.alert('Creation Failed', 'There was an error creating the bus.');
      console.error('Error creating bus:', error);
    }
  };

  const showDateTimePicker = (type) => {
    if (type === 'departure') {
      setShowDeparturePicker(true);
    } else if (type === 'arrival') {
      setShowArrivalPicker(true);
    }
  };

  const handleDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || new Date();
    if (type === 'departure') {
      setShowDeparturePicker(false);
      setDepartureTime(currentDate);
    } else if (type === 'arrival') {
      setShowArrivalPicker(false);
      setArrivalTime(currentDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Bus Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Departure Time</Text>
      <Button title="Select Departure Time" onPress={() => showDateTimePicker('departure')} />
      {showDeparturePicker && (
        <DateTimePicker
          value={departureTime}
          mode="time"
          display="default"
          onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'departure')}
        />
      )}
      <Text>{departureTime.toLocaleTimeString()}</Text>

      <Text style={styles.label}>Arrival Time</Text>
      <Button title="Select Arrival Time" onPress={() => showDateTimePicker('arrival')} />
      {showArrivalPicker && (
        <DateTimePicker
          value={arrivalTime}
          mode="time"
          display="default"
          onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'arrival')}
        />
      )}
      <Text>{arrivalTime.toLocaleTimeString()}</Text>

      <View style={{ height: 20 }} />
      <Button title="Create Bus" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default CreateBus;
