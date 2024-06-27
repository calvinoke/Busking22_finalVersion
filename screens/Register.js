import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const Register = ({ navigation }) => {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={() => register(username, email, password)} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});

export default Register;

//import React, { useState } from 'react';
//import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//import axios from 'axios';

//const Register = ({ navigation }) => {
  //  const [username, setUsername] = useState('');
   // const [email, setEmail] = useState('');
   // const [password, setPassword] = useState('');

   // const handleRegister = () => {
       // axios.post('http://your-backend-url/api/register/', {
       //     username,
       //     email,
        //    password
        //}).then(response => {
        //    console.log(response.data);
            // Navigate to the login screen
           // navigation.navigate('Login');
       // }).catch(error => {
        //    console.error(error);
       // });
    //};

    //return (
    //    <View style={styles.container}>
     //       <TextInput
     //           style={styles.input}
       //         placeholder="Username"
         //       value={username}
         //       onChangeText={setUsername}
         //   />
        //    <TextInput
           //     style={styles.input}
          //      placeholder="Email"
           //     value={email}
           //     onChangeText={setEmail}
           // />
           // <TextInput
          //      style={styles.input}
           //     placeholder="Password"
           //     value={password}
            //    onChangeText={setPassword}
            //    secureTextEntry
            ///>
           // <Button title="Register" onPress={handleRegister} />
           // <Button title="Login" onPress={() => navigation.navigate('Login')} />
       // </View>
    //);
//};

//const styles = StyleSheet.create({
//    container: {
  //      flex: 1,
  ///      justifyContent: 'center',
      //  paddingHorizontal: 20
   // },
   // input: {
   //     height: 40,
   //     borderColor: 'gray',
   //     borderWidth: 1,
   //     marginBottom: 20,
    //    paddingHorizontal: 10
   // }
//});

//export default Register;

