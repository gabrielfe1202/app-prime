// ChildContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChildContextType {
  childId: string | null;
  setChildId: (id: string | null) => void;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

interface ChildProviderProps {
  children: ReactNode;
}

export function ChildProvider({ children }: ChildProviderProps): JSX.Element {
  const [childId, setChildId] = useState<string | null>(null);

  return (
    <ChildContext.Provider value={{ childId, setChildId }}>
      {children}
    </ChildContext.Provider>
  );
}

export function useChild(): ChildContextType | undefined {
  return useContext(ChildContext);
}
