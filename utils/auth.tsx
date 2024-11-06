import React, { ComponentType, ReactNode, useEffect } from 'react';
import { useRouter } from 'expo-router';

// Tipo para o componente envolvido pelo decorador
type AuthComponentProps = {
  children?: ReactNode;
};

export function withAuthCheck<P extends AuthComponentProps>(WrappedComponent: ComponentType<P>) {
  return function AuthHOC(props: P) {
    const router = useRouter();
    const isAuthenticated = false; // Substitua com a lógica real de autenticação

    // Redirecionar para a página de login caso não esteja autenticado
    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login"); // Redireciona para a página de login
      }
    }, [isAuthenticated, router]);

    // Se estiver autenticado, renderiza o componente
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    // Caso contrário, não renderiza nada ou renderiza uma tela de carregamento
    return null;
  };
}
