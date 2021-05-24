import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
    status: "idle",
    error: "",
    todoListItems: [] as Array<{id: number | string, title: string, description: string, completed: boolean}>
};

const domainAndPort = (process.env.NODE_ENV === "development") ? "http://localhost:3001/" : "/";

let fetchItems: any = createAsyncThunk("todoListItems/fetchItems", async () => {
    let response = await fetch(`${domainAndPort}api/todoListItems`);
    let todoListItems = await response.json();
    return todoListItems;
});

let addItem: any = createAsyncThunk("todoListItems/addItem", async (todoListItem) => {
    let response = await fetch(`${domainAndPort}api/todoListItems`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todoListItem)
    }
    );
    let item = await response.json();
    return item;
});

let updateItem: any = createAsyncThunk("todoListItems/updateItem", async (todoListItem) => {
    await fetch(`${domainAndPort}api/todoListItems`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todoListItem)
    });
    return todoListItem;
});

let deleteItems: any = createAsyncThunk("todoListItems/deleteItems", async (ids) => {
    await fetch(`${domainAndPort}api/todoListItems`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ids: ids})
    });
    return ids;
});

let markAllAsCompleted: any = createAsyncThunk("todoListItems/markAllAsCompleted", async () => {
    let response = await fetch(`${domainAndPort}api/todoListItems/markAllAsCompleted`, {
        method: "PUT"
    });
    let items = await response.json();
    return items;
});

let markAllAsNotCompleted: any = createAsyncThunk("todoListItems/markAllAsNotCompleted", async () => {
    let response = await fetch(`${domainAndPort}api/todoListItems/markAllAsNotCompleted`, {
        method: "PUT"
    });
    let items = await response.json();
    return items;
});

let todoListItemsSlice = createSlice({
    name: "todoListItems",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchItems.pending] : state => {
            state.status = "loading"
        },
        [fetchItems.fulfilled] : (state, action) => {
            state.status = "idle";
            state.todoListItems = action.payload
        },
        [fetchItems.rejected] : (state, action) => {
            state.error = action.error.message;
        },

        [addItem.pending] : state => {
            state.status = "loading";
        },
        [addItem.fulfilled] : (state, action) => {
            state.status = "idle";
            state.todoListItems.push(action.payload);
        },
        [addItem.rejected] : (state, action) => {
            state.error = action.error.message;
        },

        [updateItem.pending] : state => {
            state.status = "loading";
        },
        [updateItem.fulfilled] : (state, action) => {
            state.status = "idle";
            state.todoListItems.forEach(item => {
                if(item.id == action.payload.id) {
                    item.title = action.payload.title;
                    item.description = action.payload.description;
                    item.completed = action.payload.completed;
                }
            });
        },
        [updateItem.rejected] : (state, action) => {
            state.error = action.error.message;
        },

        [deleteItems.pending] : state => {
            state.status = "loading";
        },
        [deleteItems.fulfilled] : (state, action) => {
            state.status = "idle";
            for(let id of action.payload) {
                state.todoListItems.forEach((item,index,array) => {
                    if(item.id==id) {
                        array.splice(index,1);
                    }
                })
            }
        },
        [deleteItems.rejected] : (state, action) => {
            state.error = action.error.message;
        },

        [markAllAsCompleted.pending] : state => {
            state.status = "loading";
        },
        [markAllAsCompleted.fulfilled] : (state, action) => {
            state.status = "idle";
            state.todoListItems=action.payload;
        },
        [markAllAsCompleted.rejected] : (state, action) => {
            state.error = action.error.message;
        },

        [markAllAsNotCompleted.pending] : state => {
            state.status = "loading";
        },
        [markAllAsNotCompleted.fulfilled] : (state, action) => {
            state.status = "idle";
            state.todoListItems=action.payload;
        },
        [markAllAsNotCompleted.rejected] : (state, action) => {
            state.error = action.error.message;
        },
    }
});

let getAllItems = (state: any) => state.todoListItems.todoListItems;
let getItemById = (state: any, id: number | string) => state.todoListItems.todoListItems.find((item: any) => item.id == id);
let getItemsByStatus = (state: any, status: string) => {
    if(status=="all") return state.todoListItems.todoListItems;
    if(status=="completed") return state.todoListItems.todoListItems.filter((item: any) => item.completed == true);
    if(status=="not completed") return state.todoListItems.todoListItems.filter((item:any) => item.completed == false);
}

export default todoListItemsSlice.reducer;
export {fetchItems, addItem, deleteItems, updateItem, getAllItems, getItemById, getItemsByStatus, markAllAsCompleted, markAllAsNotCompleted};