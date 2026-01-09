import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: "977869892972-j3r5nt1c0uepv4m2sqi8jk7rg6g1dhn7.apps.googleusercontent.com"
    });
  }, []);

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed up successfully
        setMessage('User signed up successfully!');
        dispatch(setUser(userCredential.user));
        // Send user data to backend
        axios.post('http://your-backend-url/api/users', {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });
      })
      .catch(error => {
        setMessage(error.message);
      });
  };

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Logged in successfully
        setMessage('User logged in successfully!');
        dispatch(setUser(userCredential.user));
        // Send user data to backend
        axios.post('http://your-backend-url/api/users', {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });
      })
      .catch(error => {
        setMessage(error.message);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      // Check if device supports Google Play services
      await GoogleSignin.hasPlayServices();
      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      // Signed in successfully
      setMessage('User signed in with Google!');
      dispatch(setUser(userCredential.user));
      // Send user data to backend
      axios.post('http://your-backend-url/api/users', {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  const user = auth().currentUser;
  if (user) {
    user.getIdToken(true).then(idToken => {

        axios.post('https://your-backend-url.com/api/endpoint', data, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then(response => {
          // Handle the response
        })
        .catch(error => {
          // Handle errors
        });

    });
  }

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Sign In with Google" onPress={handleGoogleSignIn} />
      {message && <Text>{message}</Text>}
    </View>
  );
};

export default AuthScreen;
