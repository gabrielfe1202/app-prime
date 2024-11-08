// AuthChildChecker.tsx
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import SelectChildScreen from '../components/SelectChildScreen';
import { useChild } from './ChildContext';
import { useRouter } from 'expo-router';
import { delay } from '@/utils/delay';
import { DI } from '@/controllers/DI';
import Login from '@/app/login';
import { Loading } from '@/components/Loading';
import { useAppUser } from './UserContext';
import { isNullOrEmpty } from '@/utils/stringFunctions';

interface AuthCheckerProps {
    children: React.ReactNode;
}

export function AuthChecker({ children }: AuthCheckerProps): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const { userToken } = useAppUser()

    useEffect(() => {
        const checkAuth = async () => {
            delay(1500).then(async () => {
                try {
                    const authenticated = await DI.user.isAuthenticated();
                    setIsAuthenticated(authenticated);
                } catch (error) {
                    console.error('Error checking authentication', error);
                    setIsAuthenticated(false);
                } finally {
                    setIsLoading(false);
                }
            })
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthenticated && isNullOrEmpty(userToken)) {
        return <Login />;
    }

    return <>{children}</>;
}
