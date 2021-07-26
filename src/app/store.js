import { configureStore } from '@reduxjs/toolkit';
import alertLengthReducer from './alertLengthSlice';
import hostidReducer from './hostidSlice';
import hostReducer from './hostSlice';
import ipReducer from './ipSlice';
import itemReducer from './itemSlice';
import userReducer from './userSlice';

const rootReducer = {
	ipaddress: ipReducer,
	host: hostReducer,
	hostid: hostidReducer,
	item: itemReducer,
	alertlength: alertLengthReducer,
	user: userReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
