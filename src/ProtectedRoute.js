import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.tokens?.accessToken;
    if (!token) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default Protected;