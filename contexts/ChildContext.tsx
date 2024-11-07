// ChildContext.tsx
import { KidController } from '@/controllers/kid.controller';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChildContextType {
  childId: number | null;
  setChildId: (id: number | null) => void;
  kidController: KidController
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

interface ChildProviderProps {
  children: ReactNode;
}

export function ChildProvider({ children }: ChildProviderProps): JSX.Element {
  const [childId, setChildId] = useState<number | null>(null);

  const value = {
    childId,
    setChildId,
    kidController: new KidController(),
  };

  return (
    <ChildContext.Provider value={value}>
      {children}
    </ChildContext.Provider>
  );
}

export function useChild(): ChildContextType | undefined {
  return useContext(ChildContext);
}
