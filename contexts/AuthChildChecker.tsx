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
    const childContext = useChild();
    const { childId, kidController } = childContext!;

    useEffect(() => {
        if (childContext?.childId) {
            router.replace('/(home)');
            DI.kid.setId(childContext.childId)
        }
    }, [childContext?.childId]);        

    if (!childId) {
        return <SelectChildScreen />;
    }

    kidController.setId(childId)

    return <>{children}</>;
}
