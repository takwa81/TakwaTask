import React , {useState} from 'react' ;
import { createContext, useContext, ReactNode } from 'react';
import { User , UserContextType} from '@/types';


const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    howDidYouHearAboutUs: '',
    phoneNumber: '',
    initGroup: 'learner',
  });

  const updateUser = (data: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
