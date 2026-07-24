import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("userId");
        localStorage.removeItem("cart");

        alert("Logged out successfully");

        navigate("/login");

    };

    return (

        <nav className="navbar">

            <h2 className="logo">🍔 DesiBites</h2>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/products">Products</Link>

                <Link to="/cart">Cart 🛒</Link>

                <Link to="/my-orders">My Orders</Link>

                <Link to="/admin">Admin</Link>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;