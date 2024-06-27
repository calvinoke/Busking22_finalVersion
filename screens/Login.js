import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const Login = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
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
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={() => login(username, password)} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
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

export default Login;

//import React, { useState } from 'react';
//import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//import axios from 'axios';

//const Login = ({ navigation }) => {
    //const [username, setUsername] = useState('');
    //const [password, setPassword] = useState('');

   // const handleLogin = () => {
     //   axios.post('http://your-backend-url/api/login/', {
       //     username,
        //    password
        //}).then(response => {
            //console.log(response.data);
            // Save the token and navigate to the next screen
        //}).catch(error => {
         //   console.error(error);
        //});
    //};

    //return (
        //<View style={styles.container}>
        //    <TextInput
        //        style={styles.input}
         //       placeholder="Username"
          //      value={username}
          //      onChangeText={setUsername}
           // />
           // <TextInput
           //     style={styles.input}
           //     placeholder="Password"
            //    value={password}
            //    onChangeText={setPassword}
            //    secureTextEntry
           // />
          //  <Button title="Login" onPress={handleLogin} />
          //  <Button title="Register" onPress={() => navigation.navigate('Register')} />
        //</View>
    //);
//};

//const styles = StyleSheet.create({
  //  container: {
   //     flex: 1,
   //     justifyContent: 'center',
    //    paddingHorizontal: 20
    //},
    //input: {
    //    height: 40,
    //    borderColor: 'gray',
      //  borderWidth: 1,
      //  marginBottom: 20,
      //  paddingHorizontal: 10
    //}
//});

//export default Login;





//```javascript
