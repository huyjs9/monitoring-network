import { createSlice } from '@reduxjs/toolkit';

const hostData = createSlice({
	name: 'host',
	initialState: [],
	reducers: {
		setHost: (state, action) => {
			//state=action.payload
			return action.payload;
		},
	},
});

const { reducer: hostReducer, actions } = hostData;
export const { setHost } = actions;
export default hostReducer;
