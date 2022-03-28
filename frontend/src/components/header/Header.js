import { logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Header = () => {
const navigate = useNavigate();
    const handleLogout = (e) => {
        logout();
        console.log("er")
        navigate("/login")
    }

    return (<header>Header with menu and search
        <button onClick={handleLogout}>Logout</button>
    </header>);
}

export default Header;