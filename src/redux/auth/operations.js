import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Функція axios.create використовується для створення налаштованого екземпляра Axios
export const goitApi = axios.create({
	baseURL: 'https://connections-api.goit.global/',
});

// Utility to add JWT
const setAuthHeader = (token) => {
	goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
	goitApi.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
	'auth/register',
	async (credentials, thunkAPI) => {
		try {
			const response = await goitApi.post('/users/signup', credentials);
			// After successful registration, add the token to the HTTP header
			setAuthHeader(response.data.token);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const login = createAsyncThunk(
	'auth/login',
	async (credentials, thunkAPI) => {
		try {
			const response = await goitApi.post('/users/login', credentials);
			// After successful login, add the token to the HTTP header
			setAuthHeader(response.data.token);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	try {
		await goitApi.post('/users/logout');
		// After a successful logout, remove the token from the HTTP header
		clearAuthHeader();
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	}
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
	'auth/refresh',
	async (_, thunkAPI) => {
		// Reading the token from the state via getState()
		const state = thunkAPI.getState();
		const savedToken = state.auth.token;

		if (!savedToken) {
			// If there is no token, exit without performing any request
			return thunkAPI.rejectWithValue('Unable to fetch user');
		}

		try {
			// If there is a token, add it to the HTTP header and perform the request
			setAuthHeader(savedToken);
			const response = await goitApi.get('/users/current');
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
