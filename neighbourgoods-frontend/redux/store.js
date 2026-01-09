// store.js
import { configureStore } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { getFirebase: getAuth },
      },
    }),
});

export default store;
