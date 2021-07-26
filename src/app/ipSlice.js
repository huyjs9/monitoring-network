import { createSlice } from '@reduxjs/toolkit';

const ipAdd = createSlice({
	name: 'ipaddress',
	initialState: [],
	reducers: {
		setIp: (state, action) => {
			//state=action.payload
			return action.payload;
		},
	},
});

const { reducer: ipReducer, actions } = ipAdd;
export const { setIp } = actions;
export default ipReducer;
