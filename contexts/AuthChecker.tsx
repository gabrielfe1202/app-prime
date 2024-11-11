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
    const { userToken } = useAppUser()

    if (isNullOrEmpty(userToken)) return <Login />;

    return <>{children}</>;
}
