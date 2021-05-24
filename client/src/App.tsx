import React from 'react';
import TodoListItems from "./TodoListItems";
import Navbar from "./Navbar";
import Footer from "./Footer";
import './App.css';
import { useSelector } from "react-redux";
import { getItemsByStatus, markAllAsCompleted, markAllAsNotCompleted, deleteItems } from "./todoListItemsSlice";
import { Route } from "react-router-dom";
import AddTodoListItem from './AddTodoListItem';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TodoListItemFullView from "./TodoListItemFullView";

function App() {
  let [filter, setFilter] = useState("all");
  let [markAllAsValue, setMarkAllAsValue] = useState(" ");
  let todoListItems = useSelector( state => getItemsByStatus(state, filter));
  let dispatch = useDispatch();

  useEffect(() => {
    if(markAllAsValue=="completed") dispatch(markAllAsCompleted());
    else if(markAllAsValue=="not completed") dispatch(markAllAsNotCompleted());
  },[markAllAsValue]); 

  const delItems = () => {
    let ids = todoListItems.map((item:any) => item.id);
    dispatch(deleteItems(ids));
  }

  return (
    <div className="app">
      <Navbar />
      <Route exact path="/todoListItems">
        <TodoListItems todoListItems={todoListItems} />
      </Route>
      <Route exact path="/addItem">
        <AddTodoListItem/>
      </Route>
      <Route exact path="/todoListItems/:todoListItemId">
        <TodoListItemFullView/>
      </Route>
      <Footer setFilter={(filter: string) => setFilter(filter)} filterValue={filter}
              setMarkAllAsValue={(filter: string) => setMarkAllAsValue(filter)} markAllAsValue={markAllAsValue}
              deleteItems={delItems}
      />
    </div>
  );
}

export default App;
