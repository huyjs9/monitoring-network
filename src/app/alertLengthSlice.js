import { createSlice } from '@reduxjs/toolkit';

const alertLengthData = createSlice({
	name: 'alertlength',
	initialState: null,
	reducers: {
		setAlertLength: (state, action) => {
			//state=action.payload
			return action.payload;
		},
	},
});

const { reducer: alertLengthReducer, actions } = alertLengthData;
export const { setAlertLength } = actions;
export default alertLengthReducer;
