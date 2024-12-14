// Функції-селектори для використання в useSelector

import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
// 1. state - загальний стан нашого додатка
// 2. contacts - ім'я слайсу
// 3. items - значення властивості items з initialState цього слайсу
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectSuccessAdd = state => state.contacts.successAdd;
export const selectSuccessDelete = state => state.contacts.successDelete;

// Зі слайса filters
const selectValueFilter = (state) => state.filters.value;

// Фільтруємо контакти та отримуємо новий масив відфільтрованих контактів (ContactList)
// export const selectFilteredContacts = createSelector(
// 	[selectContacts, selectValueFilter],
// 	(contacts, filterValue) => {
// 		return contacts.filter(contact =>
// 			contact.name.toLowerCase().includes(filterValue.toLowerCase()) ||
// 			contact.number.toLowerCase().includes(filterValue.toLowerCase())
// 		);
// 	}
// );

// Зі слайса sorting
const selectSorted = state => state.sorting.value;

// Сортуємо контакти та отримуємо новий масив відсортованих контактів (ContactList)
export const selectSortedContacts = createSelector(
	[selectContacts, selectSorted],
	(contacts, sortingValue) => {
		if (!contacts) return [];
		switch (sortingValue) {
			case "alphabeticalAsc":
				return [...contacts].sort((a, b) => a.name.localeCompare(b.name));
			case "alphabeticalDesc":
				return [...contacts].sort((a, b) => b.name.localeCompare(a.name));
			case "dateAddedAsc":
				return [...contacts].sort((a, b) => a.id.localeCompare(b.id));
			case "dateAddedDesc":
				return [...contacts].sort((a, b) => b.id.localeCompare(a.id));
			default:
				return contacts;
		}
	}
);

// Комбінуємо selectFilteredContacts та selectSortedContacts
export const selectVisibleContacts = createSelector(
	[selectSortedContacts, selectValueFilter],
	(sortedContacts, filterValue) => {
		if (!filterValue) return sortedContacts;

		return sortedContacts.filter(contact =>
			contact.name.toLowerCase().includes(filterValue.toLowerCase()) ||
			contact.number.toLowerCase().includes(filterValue.toLowerCase())
		);
	}
);

