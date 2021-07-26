import { createSlice } from '@reduxjs/toolkit';

const itemData = createSlice({
	name: 'host',
	initialState: [],
	reducers: {
		setItem: (state, action) => {
			//state=action.payload
			return action.payload;
		},
	},
});

const { reducer: itemReducer, actions } = itemData;
export const { setItem } = actions;
export default itemReducer;
