import { deleteItems } from "./todoListItemsSlice";

const Footer = (props: any) => {
    let {filterValue, setFilter, markAllAsValue, setMarkAllAsValue, deleteItems} = props;
    return (
        <div className="footer">
            <div className="footerEntry">
                <label htmlFor="showFilter">show:</label>
                    <select id="showFilter" value={filterValue} onChange={e => setFilter(e.target.value)}>
                        <option value="completed">completed</option>
                        <option value="not completed">not completed</option>
                        <option value="all">all</option>
                    </select>
            </div>
            <div className="footerEntry">
                <label htmlFor="markAllAs">mark all as:</label>
                <select id="markAllAs" value={markAllAsValue} onChange={e => setMarkAllAsValue(e.target.value)}>
                    <option value=""></option>
                    <option value="completed">completed</option>
                    <option value="not completed">not completed</option>
                </select>
            </div>
            <div className="footerEntry">
                <button onClick={() => deleteItems()}>Delete presented items</button>
            </div>
        </div>
    )
}

export default Footer;