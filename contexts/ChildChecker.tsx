// AuthChildChecker.tsx
import React, { useEffect } from 'react';
import SelectChildScreen from '../components/SelectChildScreen';
import { useChild } from './ChildContext';
import { useRouter } from 'expo-router';
import { DI } from '@/controllers/DI';

interface AuthChildCheckerProps {
    children: React.ReactNode;
}

export function ChildChecker({ children }: AuthChildCheckerProps): JSX.Element {
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
