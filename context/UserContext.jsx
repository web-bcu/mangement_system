import { createContext, useContext, useState } from "react";

export const UserContext = createContext({});

export function useUserContext() {
    return useContext(UserContext);
}

export default function UserContextProvider({children}) {
    const [user, setUser] = useState({
        id: "23560092",
        full_name: "Viet An Nguyen",
        department_id: "dp_01",
        role: "user"
    })

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}