import UserContext from "./UserContext";
import Header from "./Header";
import Profile from "./Profile";

const AppCon = () => {
    const username = "Sujjal Khadka";

    return (
        <UserContext.Provider value={username}>
            <div>
                <Header />
                <Profile />
            </div>
        </UserContext.Provider>
    )
}
export default AppCon;