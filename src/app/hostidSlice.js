import { createSlice } from '@reduxjs/toolkit';

const hostidData = createSlice({
	name: 'hostid',
	initialState: [],
	reducers: {
		setHostid: (state, action) => {
			//state=action.payload
			return action.payload;
		},
	},
});

const { reducer: hostidReducer, actions } = hostidData;
export const { setHostid } = actions;
export default hostidReducer;
