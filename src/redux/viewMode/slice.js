import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	value: "list"
}

const slice = createSlice({
	name: "viewMode",
	initialState,
	reducers: {
		changeViewMode: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const { changeViewMode } = slice.actions;

export const viewModeReducer = slice.reducer;