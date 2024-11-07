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

interface AuthChildCheckerProps {
    children: React.ReactNode;
}

export function AuthAndChildChecker({ children }: AuthChildCheckerProps): JSX.Element {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const childContext = useChild();

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

    useEffect(() => {
        if (childContext?.childId) {
            router.replace('/(home)');
            DI.kid.setId(childContext.childId)
        }
    }, [childContext?.childId]);

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Login />;
    }

    if (!childContext) {
        return <SelectChildScreen />;
    }

    const { childId } = childContext;

    if (!childId) {
        return <SelectChildScreen />;
    }
    return <>{children}</>;
}
