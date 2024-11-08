import { UserController } from '@/controllers/user.controller';
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface UserContextType {
    userToken: string | null;
    setUserToken: (id: string | null) => void;
    userController: UserController; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps): JSX.Element {
    const [userToken, setUserToken] = useState<string | null>(null);
    const userController = useMemo(() => new UserController(), []);

    const value = {
        userToken,
        setUserToken,
        userController,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useAppUser(): UserContextType  {
    const context = useContext(UserContext);
    return context!;
}
