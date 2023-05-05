import { createStore } from 'redux';
import { userReducer } from './reducer/userReducer';

export const Store = () => createStore(userReducer)