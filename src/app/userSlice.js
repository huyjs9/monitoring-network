import { createSlice } from '@reduxjs/toolkit';

const userAdd = createSlice({
	name: 'user',
	initialState: [],
	reducers: {
		setUser: (state, action) => {
			//state=action.payload
			return action.payload;
		},
	},
});

const { reducer: userReducer, actions } = userAdd;
export const { setUser } = actions;
export default userReducer;
