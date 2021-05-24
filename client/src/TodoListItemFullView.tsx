import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "./todoListItemsSlice";
import { useHistory, useParams } from "react-router-dom";
import { getItemById } from "./todoListItemsSlice";

const TodoListItemFullView = () => {
    let { todoListItemId }: any = useParams();
    let listItem = useSelector(state => getItemById(state,todoListItemId));
    let dispatch = useDispatch();
    let history = useHistory();
    
    let [title, setTitle] = useState(listItem.title);
    let [description, setDescription] = useState(listItem.description);
    let [completedStatus, setCompletedStatus] = useState(listItem.completed);
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
            updateItem({
                     id: listItem.id,
                     title,
                     description: (description == " ") ? "No description was provided" : description,
                     completed: completedStatus})
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
                           onBlur={() => setTouched(touched => {return {...touched,title:true}})}
                    />
                    <span>{errors.title && errors.title}</span>
                </div>
                <div className="addTodoListItemFormEntry">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" 
                              value={description} 
                              onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="addTodoListItemFormEntry">
                    <label htmlFor="completed">Completed</label>
                    <input type="checkbox" 
                           id="completed" 
                           checked={completedStatus} 
                           onChange={e => setCompletedStatus(e.target.checked)}
                    />
                </div>
                <button type="submit" disabled={!title} style={{width:"120px"}}>Save changes</button>
            </form>
        </div>
    )
}

export default TodoListItemFullView;