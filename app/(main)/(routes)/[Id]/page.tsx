"use client";
import { useParams } from 'next/navigation';
import Chat from "@/components/chats/Chat";
import Loader from '@/components/Loader';

const ChatPage = () => {
  const { Id } = useParams();

  if (!Id) {
    return <div className='flex justify-center items-center h-100'><Loader/></div>;
  }

  return <Chat id={Id as string} />;
};

export default ChatPage;