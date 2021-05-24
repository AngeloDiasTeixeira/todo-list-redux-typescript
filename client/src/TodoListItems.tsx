import TodoListItem from "./TodoListItem";

const TodoListItems = (props: any) => {
    let {todoListItems} = props;
    return (
        <div className="todoListItems">
            {todoListItems.map((item: any) => <TodoListItem key={item.id} todoListItem={item}/>)}
        </div>
    )
}

export default TodoListItems;