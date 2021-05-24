import { useDispatch, useSelector } from "react-redux";
import { updateItem, deleteItems } from "./todoListItemsSlice";
import { Link } from "react-router-dom";

const TodoListItem = (props: any) => {
    let {id, title, description, completed} = props.todoListItem;
    let dispatch = useDispatch();
    let completedStatus: boolean;
    useSelector((state: any) => {
        state.todoListItems.todoListItems.forEach((item:any) => {
            if(item.id == id) completedStatus = item.completed;
        })
    });

    const statusChanged = (e: any) => {
        dispatch(updateItem({id,title,description,completed: !completedStatus}));
    }

    return (
        <div className="todoListItem">
            <div className="todoListItemTitle">
                <h3>Title:</h3>
                <p>{title}</p>
            </div>
            <div className="todoListItemDescription">
                <h3>Description:</h3>
                <p>{(description.length > 50) ? (description.substring(0,70) + "...") : description}</p>
            </div>
            <div className="todoListItemStatus">
                <h3><label htmlFor="status">Completed:</label></h3>
                <input id="status" 
                       type="checkbox" 
                       checked={(completedStatus! == true) ? true : false} 
                       onChange={statusChanged}
                />
            </div>
            <button onClick={() => dispatch(deleteItems([id]))}>X</button>
            <Link to={"/todoListItems/"+id}>
                View full item
            </Link>
        </div>
    )
}

export default TodoListItem;