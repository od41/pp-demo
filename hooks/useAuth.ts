import { AuthContext } from '@/context/auth-context';
import { useContext } from 'react';

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
