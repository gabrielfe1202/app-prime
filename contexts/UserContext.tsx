import { Loading } from '@/components/Loading';
import { UserController } from '@/controllers/user.controller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';

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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const userController = new UserController();

    const value = {
        userToken,
        setUserToken,
        userController,
    };

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await userController.getToken();
                if (storedToken) {
                    setUserToken(storedToken); 
                } else {
                    setUserToken(null);
                }
            } catch (error) {
                console.error('Error loading token from AsyncStorage', error);
                setUserToken(null); 
            } finally {
                setIsLoading(false);
            }
        };

        loadToken();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

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
