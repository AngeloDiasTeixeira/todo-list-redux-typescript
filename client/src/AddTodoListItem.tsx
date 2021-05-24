import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./todoListItemsSlice";
import { useHistory } from "react-router-dom";

const AddTodoListItem = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState(" ");
    let [touched, setTouched] = useState({});

    const getErrors = () => {
        let result: any = {};
        if(("title" in touched) && (!title)) result.title = "Title field is required!";
        return result;
    }
    let errors: {title: string} = getErrors();

    const onSubmit = (e: any) => {
        e.preventDefault();
        dispatch(
            addItem({title,
                     description: (description == " ") ? "No description was provided" : description,
                     completed: false})
                );
        history.push("/todoListItems");
    }

    return (
        <div className="addTodoListItem">
            <form onSubmit={onSubmit}>
                <div className="addTodoListItemFormEntry">
                    <label htmlFor="title">Title</label>
                    <input id="title" 
                           value={title} 
                           onChange={e => setTitle(e.target.value)} 
                           onBlur={() => setTouched(touched => {return {...touched,title:true}})
                    }/>
                    <span>{errors.title && errors.title}</span>
                </div>
                <div className="addTodoListItemFormEntry">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" 
                              value={description} 
                              onChange={e => setDescription(e.target.value)}
                              onBlur={() => setTouched(touched => {return {...touched,description:true}})}
                    />
                </div>
                <button type="submit" disabled={!title}>Add item</button>
            </form>
        </div>
    )
}

export default AddTodoListItem;