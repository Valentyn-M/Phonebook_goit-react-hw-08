import { createAsyncThunk } from '@reduxjs/toolkit';
import { goitApi } from '../auth/operations';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  // Колбек-функція, в якій виконується запит, називається payloadCreator і відповідає за формування значення для властивості payload. Вона буде викликана з двома аргументами: arg та thunkAPI.
  async (_, thunkAPI) => {
    try {
      const response = await goitApi.get('/contacts');
      // При успішному запиті повертаємо проміс із даними (масив контактів)
      return response.data;
    } catch (error) {
      // При помилці запиту повертаємо проміс, який буде відхилений з текстом помилки
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
  try {
    const response = await goitApi.post('/contacts', contact);
    // Отримуємо у відповідь контакт (об'єкт)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, thunkAPI) => {
  try {
    const response = await goitApi.delete(`/contacts/${contactId}`);
    // Отримуємо у відповідь контакт (об'єкт)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editContactName = createAsyncThunk(
  'contacts/editContactName',
  async ({ contactId, newName }, thunkAPI) => {
    try {
      const response = await goitApi.putch(`/contacts/${contactId}`, { name: newName });
      // Отримуємо у відповідь контакт (об'єкт) з новим значенням властивісті "name"
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContactNumber = createAsyncThunk(
  'contacts/editContactNumber',
  async ({ contactId, newNumber }, thunkAPI) => {
    try {
      const response = await goitApi.putch(`/contacts/${contactId}`, { number: newNumber });
      // Отримуємо у відповідь контакт (об'єкт) з новим значенням властивісті "number"
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
