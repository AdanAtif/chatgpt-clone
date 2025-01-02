"use client";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConversations, deleteConversation } from '@/store/ConversationSlice';
import {MessageSquare, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loader from '../Loader';
import { AppDispatch, RootState } from '@/store/store';
import DeleteConversationModal from '../model/deleteConversation-model';

const Conversations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const { conversations, loading } = useSelector((state:RootState) => state.conversations);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const deleteHandler = (id:string) => {
    dispatch(deleteConversation(id));
  };

  return (
    <>
    <DeleteConversationModal isOpen={isOpen} onClose={() => setIsOpen(false)} loading={loading} onConfrim={()=> deleteHandler(id)} />
     <div className="flex flex-col justify-center items-center space-y-2 px-2">
      {loading ? (
        <div className="my-4">
          <Loader />
        </div>
      ) : (
        conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="border-2 border-[#444654] rounded-md w-full h-11 flex items-center justify-between text-center px-2 space-x-2 bg-[#343540] cursor-pointer"
            onClick={() => router.push(`/${conversation.id}`)}
          >
            <MessageSquare className="w-[18px] h-[18px] text-[#ECECF1]" size={10} />
            <span className="text-[#ECECF1] font-medium text-sm truncate">
              {conversation.name}
            </span>
            <div className="flex justify-center items-center space-x-1">
              <Trash2
                className="w-[18px] cursor-pointer h-[18px] text-[#ECECF1]"
                size={10}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                  setId(conversation.id);
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
    </>
   
  );
};

export default Conversations;

