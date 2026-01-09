// utils/loginUser.js
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';

export const handleLogin = (email, password) => {
  const dispatch = useDispatch();
  dispatch(loginUser({ email, password }));
};

// utils/registerUser.js
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';

export const handleRegister = (email, password) => {
  const dispatch = useDispatch();
  dispatch(registerUser({ email, password }));
};
