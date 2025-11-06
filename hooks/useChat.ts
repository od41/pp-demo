import { ChatContext } from '@/context/chat-context';
import { useContext } from 'react';

// Custom hook to use the AuthContext
export const useChat = () => useContext(ChatContext);
