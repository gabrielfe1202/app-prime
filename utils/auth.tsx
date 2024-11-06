import React, { ComponentType, ReactNode, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import { DI } from '@/controllers/DI';
import { delay } from './delay';

// Tipo para o componente envolvido pelo decorador
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
                        setIsAuthenticated(false); // Caso erro, assumimos que não está autenticado
                    } finally {
                        setIsLoading(false);
                    }
                })
            };

            checkAuth();
        }, []); // Apenas rodar uma vez, na montagem do componente

        if (isLoading) {
            return <Text>Loading...</Text>; // Você pode substituir por uma tela de carregamento ou algo do tipo
        }

        if (!isAuthenticated) {
            router.replace('/login'); // Redireciona para a página de login
            return null; // Não renderiza o componente se não estiver autenticado
        }

        // Se estiver autenticado, renderiza o componente original
        return <WrappedComponent {...props} />;
    }
}
