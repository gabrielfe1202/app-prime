import React from 'react';
import Login from '@/app/login';
import { useAppUser } from './UserContext';
import { isNullOrEmpty } from '@/utils/stringFunctions';

interface AuthCheckerProps {
    children: React.ReactNode;
}

export function AuthChecker({ children }: AuthCheckerProps): JSX.Element {
    const { userToken } = useAppUser()

    if (isNullOrEmpty(userToken)) return <Login />;

    return <>{children}</>;
}
