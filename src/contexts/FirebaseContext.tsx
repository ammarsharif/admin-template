import React, { createContext, useEffect, useReducer } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  UserCredential
} from 'firebase/auth';

// action - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project import
import Loader from 'components/Loader';
import { AuthProps, FirebaseContextType } from 'types/auth';
import axios from '../utils/axios';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Context initial state
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const setSession = (accessToken?: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (user && accessToken) {
        setSession(accessToken);
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: {
              id: user.uid,
              email: user.email!,
              name: user.displayName || 'Admin',
              role: 'Admin'
            }
          }
        });
      } else {
        dispatch({ type: LOGOUT });
      }
    });

    return () => unsubscribe();
  }, []);

  const firebaseEmailPasswordSignIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  const login = async (email: string, password: string) => {
    try {
      let userCredential: UserCredential;
      userCredential = await firebaseEmailPasswordSignIn(email, password);
      if (userCredential.user) {
        const token = await userCredential.user.getIdToken();
        console.log(token);
        setSession(token);
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: {
              id: userCredential.user.uid,
              email: userCredential.user.email!,
              name: userCredential.user.displayName || 'Admin',
              role: 'Admin'
            }
          }
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const firebaseGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseTwitterSignIn = () => {
    const provider = new TwitterAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseFacebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseRegister = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  const updateProfile = () => {};

  if (!state.isInitialized) {
    return <Loader />;
  }

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        firebaseRegister,
        firebaseEmailPasswordSignIn,
        login,
        firebaseGoogleSignIn,
        firebaseTwitterSignIn,
        firebaseFacebookSignIn,
        logout,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
