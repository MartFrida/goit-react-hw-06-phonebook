import { actionTypes } from "./actionTypes"

export const addContact = (user) => {
  return { type: actionTypes.addContact, payload: user }
}

export const filterContacts = (query) => {
  return { type: actionTypes.filterContacts, payload: query }
}