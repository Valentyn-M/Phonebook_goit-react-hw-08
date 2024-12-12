import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { login, logout, refreshUser, register } from "./operations";

const initialState = {
	user: {
		name: null,
		email: null,
	},
	token: null,
	isLoggedIn: false,
	isRefreshing: false, // для відстеження стану оновлення юзера (refreshUser)
	loading: false,
	error: null,
}

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isLoggedIn = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isLoggedIn = true;
			})
			.addCase(logout.fulfilled, () => {
				return initialState;
			})
			.addCase(refreshUser.pending, (state) => {
				state.isRefreshing = true;
			})
			.addCase(refreshUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoggedIn = true;
				state.isRefreshing = false;
			})
			.addCase(refreshUser.rejected, (state) => {
				state.isRefreshing = false;
			})
			.addMatcher(
				isAnyOf(
					register.pending,
					login.pending,
					logout.pending,
				),
				(state) => {
					state.loading = true;
				}
			)
			.addMatcher(
				isAnyOf(
					register.rejected,
					login.rejected,
					logout.rejected,
				),
				(state, action) => {
					state.loading = false;
					state.error = action.payload;
				}
			);
	},
});

export const { clearError } = slice.actions;

export const authReducer = slice.reducer;