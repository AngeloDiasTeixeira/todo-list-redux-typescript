import { configureStore } from "@reduxjs/toolkit";
import todoListItemsReducer from "./todoListItemsSlice";

let store = configureStore({
    reducer: {
        todoListItems: todoListItemsReducer
    }
});

export default store;