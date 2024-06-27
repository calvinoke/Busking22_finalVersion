import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.apiUrl;


//const API_BASE_URL = 'http://localhost:8000/api';

const UpdateBus = ({ route, navigation }) => {
    const { id } = route.params;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');

    useEffect(() => {
        fetchBus();
    }, []);

    const fetchBus = async () => {
        try {
            const response = await axios.get(`${API_URL}/buses/${id}`, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            const bus = response.data;
            setName(bus.name);
            setPrice(bus.price);
            setDepartureTime(bus.departure_time);
            setArrivalTime(bus.arrival_time);
        } catch (error) {
            console.error('Error fetching bus:', error);
        }
    };

    const handleSubmit = async () => {
        const formData = {
            name,
            price,
            departure_time: departureTime,
            arrival_time: arrivalTime,
        };

        try {
            const response = await axios.put(`${API_URL}/buses/${id}/`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const updatedBus = response.data;

            Alert.alert('Bus Updated', 'The bus was successfully updated.');

            navigation.navigate('BusList', { updatedBus });
        } catch (error) {
            Alert.alert('Update Failed', 'There was an error updating the bus.');
            console.error('Error updating bus:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
            />

            <Text style={styles.label}>Bus Price</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Price"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Departure Time</Text>
            <TextInput
                style={styles.input}
                value={departureTime}
                onChangeText={setDepartureTime}
                placeholder="Departure Time"
            />

            <Text style={styles.label}>Arrival Time</Text>
            <TextInput
                style={styles.input}
                value={arrivalTime}
                onChangeText={setArrivalTime}
                placeholder="Arrival Time"
            />

            <View style={{ height: 20 }} />
            <Button title="Update Bus" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
});

export default UpdateBus;