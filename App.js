import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BusListScreen from './screens/BusList'
import BookingScreen from './screens/Booking';
import BookingListScreen from './screens/BookingList';
import HomeScreen from './screens/HomeScreen';
import CreateBus from './screens/CreateBus';
import UpdateBus from './screens/UpdateBus';
import UpdateBooking from './screens/UpdateBooking';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="BusList" component={BusListScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="BookingList" component={BookingListScreen} />
        <Stack.Screen name="CreateBus" component={CreateBus} options={{ title: 'Add Bus' }} />
        <Stack.Screen name="UpdateBus" component={UpdateBus} options={{ title: 'Edit Bus' }} />
        <Stack.Screen name="UpdateBooking" component={UpdateBooking} options={{ title: 'Edit Booking' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
