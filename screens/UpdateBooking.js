import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, Picker } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.apiUrl;

const UpdateBooking = ({ route, navigation }) => {
    const { id } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');    
    const [seats, setSeats] = useState('');
    const [buses, setBuses] = useState([]);
    const [busId, setBusId] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchBooking();
        fetchBuses();
    }, []);

    const fetchBooking = async () => {
        try {
            const response = await axios.get(`${API_URL}/bookings/${id}/`,{
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            const booking = response.data;
            setName(booking.name);
            setEmail(booking.email);
            setPhone(booking.phone);
            setSeats(booking.seats.toString());
            setBusId(booking.bus);
        } catch (error) {
            console.error('Error fetching booking:', error);
        }
    };

    const fetchBuses = async () => {
        try {
            const response = await axios.get(`${API_URL}/buses/`,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            setBuses(response.data);
        } catch (error) {
            console.error('Error fetching buses:', error);
        }
    };

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!name.trim()) {
            errors.name = 'Name is required';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Invalid email format';
            valid = false;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            errors.phone = 'Phone number must be 10 digits';
            valid = false;
        }

        if (!seats || isNaN(seats) || parseInt(seats) <= 0) {
            errors.seats = 'Number of seats must be a positive number';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validate()) {
            return;
        }

        const booking = { name: name, email: email, phone: phone, seats: parseInt(seats), bus: busId };
        try {
            await axios.put(`${API_URL}/bookings/${id}/`, booking, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Alert.alert('Booking Updated', 'The booking was successfully updated.');
            navigation.navigate('BookingList');
        } catch (error) {
            Alert.alert('Update Failed', 'There was an error updating the booking.');
            console.error('Error updating booking:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Passenger Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
                autoCapitalize="words"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.label}>Passenger Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.label}>Passenger Phone</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone"
                keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <Text style={styles.label}>Seat Number</Text>
            <TextInput
                style={styles.input}
                value={seats}
                onChangeText={setSeats}
                placeholder="Seats"
                keyboardType="numeric"
            />
            {errors.seats && <Text style={styles.errorText}>{errors.seats}</Text>}

            <Text style={styles.label}>Bus</Text>
            <Picker
                selectedValue={busId}
                onValueChange={(itemValue) => setBusId(itemValue)}
                style={styles.picker}
            >
                {buses.map(bus => (
                    <Picker.Item key={bus.id} label={bus.name} value={bus.id} />
                ))}
            </Picker>

            <Button title="Update Booking" onPress={handleSubmit} />
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
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default UpdateBooking;
