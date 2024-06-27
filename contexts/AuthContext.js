import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };

        loadUser();
    }, []);

    const login = async (username, password, {navigation}) => {
        try {
            const response = await axios.post('http://localhost:8000/login/', { username, password });
            const { access, refresh } = response.data;
            setUser({ username, access, refresh });
            await AsyncStorage.setItem('user', JSON.stringify({ username, access, refresh }));
            navigation.navigate('HomeScreen')
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (username, email, password, {navigation}) => {
        try {
            const response = await axios.post('http://localhost:8000/api/register/', { username, email, password });
            const { access, refresh } = response.data;
            setUser({ username, access, refresh });
            await AsyncStorage.setItem('user', JSON.stringify({ username, access, refresh }));
            navigation.navigate('Login')
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async ({navigation}) => {
        try {
            const refreshToken = user.refresh;
            await axios.post('http://localhost:8000/api/logout/', { refresh: refreshToken });
            setUser(null);
            await AsyncStorage.removeItem('user');
            navigation.navigate('Login')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )};
