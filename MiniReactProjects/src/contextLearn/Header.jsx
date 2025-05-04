import { useContext } from "react";
import UserContext from "./UserContext";
import InsideHeader from "./InsideHeader";

const Header = () => {
    const user = useContext(UserContext);
    
    return(
    <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">Welcome, {user}!</h1>
        <InsideHpeader />
    </header>
)
}

export default Header;