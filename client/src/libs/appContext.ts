import { useContext, createContext } from 'react';

export type UserSession = {
  isAuthenticated: boolean;
  userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
};

export const AppContext = createContext<UserSession | null>(null);

export const useAppContext = () => useContext(AppContext);
