import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <div className="navbar">
                <Link to="/todoListItems">
                    <h4>HomePage</h4>
                </Link>
                <Link to="/addItem">
                    <h4>Add new item</h4>
                </Link>
        </div>
        </div>
    )
}

export default Navbar;