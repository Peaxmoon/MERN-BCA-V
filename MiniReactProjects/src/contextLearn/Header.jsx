import { useContext } from "react";
import UserContext from "./UserContext";

const Header = () => {
    const user = useContext(UserContext);
    
    return(
    <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">Welcome, {user}!</h1>
    </header>
)
}

export default Header;