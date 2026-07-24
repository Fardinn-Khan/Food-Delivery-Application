import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please login first!");
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;