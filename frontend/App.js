import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import WelcomePageScreen from './screens/WelcomePage';
import CatalogueScreen from './screens/Catalogue';
import UserProfileScreen from './screens/UserProfile';
import ChangePasswordScreen from './screens/ChangePassword';
import ListBookPersonScreen from './screens/ListBookPerson';
import Add_UpdateBookListScreen from './screens/Add_UpdateBookList';
import BookDetailScreen from './screens/BookDetail';
import AuthorDetailScreen from './screens/AuthorDetail';
import PublisherDetailScreen from './screens/PublisherDetail';


const Stack = createNativeStackNavigator();

const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='WelcomePage' component={WelcomePageScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Catalogue' component={CatalogueScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='UserProfile' component={UserProfileScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='ListBookPerson' component={ListBookPersonScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Add_UpdateBookList' component={Add_UpdateBookListScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='BookDetail' component={BookDetailScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='AuthorDetail' component={AuthorDetailScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='PublisherDetail' component={PublisherDetailScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default App;


