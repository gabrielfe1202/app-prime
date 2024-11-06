import React, { ComponentType, ReactNode, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import { DI } from '@/controllers/DI';
import { delay } from './delay';
import { Loading } from '@/components/Loading';

type AuthComponentProps = {
    children?: ReactNode;
};

export function withAuthCheck<P extends AuthComponentProps>(WrappedComponent: ComponentType<P>) {
    return function AuthHOC(props: P) {
        const router = useRouter();
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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

        if (!isAuthenticated) {
            router.replace('/login');
            return null; 
        }

        return <WrappedComponent {...props} />;
    }
}
