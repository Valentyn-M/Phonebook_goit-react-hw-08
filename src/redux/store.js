import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contacts/slice";
import { modalsReducer } from "./modals/slice";
import { filtersReducer } from "./filters/slice";
import { authReducer } from "./auth/slice";

// Бібліотека Redux Persist для збереження статусу авторизації користувача у локальному сховищі браузера.
// 1
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { sortingReducer } from "./sorting/slice";
import { viewModeReducer } from "./viewMode/slice";
// 2
// Persisting token field from auth slice to localstorage
const persistConfig = {
	key: 'auth',
	version: 1,
	storage,
	whitelist: ['token'], // Зберігаємо лише ключ
};
// 3
const persistedReducer = persistReducer(persistConfig, authReducer);

// Код оголошення редюсерів слайсів
export const store = configureStore({
	reducer: {
		contacts: contactsReducer,
		filters: filtersReducer,
		modals: modalsReducer,
		auth: persistedReducer,
		sorting: sortingReducer,
		viewMode: viewModeReducer,
	},
	// 4
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// 5
export const persistor = persistStore(store);