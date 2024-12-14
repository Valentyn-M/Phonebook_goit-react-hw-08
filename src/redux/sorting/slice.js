import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	value: "alphabeticalAsc"
}

const slice = createSlice({
	name: "sorting",
	initialState,
	reducers: {
		changeSorting: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const { changeSorting } = slice.actions;

export const sortingReducer = slice.reducer;