// utils/useGoogleLogin.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { setUser, setError } from '../redux/slices/authSlice';

export const useGoogleLogin = () => {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '977869892972-j3r5nt1c0uepv4m2sqi8jk7rg6g1dhn7.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((result) => {
          dispatch(setUser(result.user));
        })
        .catch((err) => dispatch(setError(err.message)));
    }
  }, [response, dispatch]);

  return { request, promptAsync };
};
