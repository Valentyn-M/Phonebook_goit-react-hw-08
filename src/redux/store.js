import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contacts/slice";
import { modalsReducer } from "./modals/slice";
import { filtersReducer } from "./filters/slice";
import { authReducer } from "./auth/slice";

// Код оголошення редюсерів слайсів
export const store = configureStore({
	reducer: {
		contacts: contactsReducer,
		filters: filtersReducer,
		modals: modalsReducer,
		auth: authReducer,
	}
});