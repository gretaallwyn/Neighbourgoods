import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import { setUser } from '../redux/slices/authSlice';
import { checkAuthStatus } from '../utils/authUtils'; // Utility function to check auth status

const Stack = createStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const verifyAuthStatus = async () => {
      const userData = await checkAuthStatus();
      if (userData) {
        dispatch(setUser(userData));
      }
    };

    verifyAuthStatus();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Auth'}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
// import AuthStack from './AuthStack';
// import HomeStack from './HomeStack';

// const AppNavigator = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   return (
//     <NavigationContainer>
//       {isAuthenticated ? <HomeStack /> : <AuthStack />}
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;
