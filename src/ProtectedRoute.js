import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth);
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default Protected;