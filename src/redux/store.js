import { devToolsEnhancer } from "@redux-devtools/extension";
import { combineReducers, createStore } from "redux";
import { contactsReducer } from "./contacts/reducer";


const roorReducer = combineReducers({
  contactsData: contactsReducer
})

const devtools = devToolsEnhancer()

export const store = createStore(roorReducer, devtools)