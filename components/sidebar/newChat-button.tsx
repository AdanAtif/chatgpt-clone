"use client";
import { useState } from "react";
import AddConversationModal from "../model/addConversation-model";
import { Plus } from "lucide-react";

const NewChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AddConversationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="pt-2 py-3 px-2">
        <button
          className="border-2 border-[#444654] rounded-md w-full h-11 pl-2 flex items-center justify-start space-x-3"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-[18px] h-[18px] text-white" size={10} />
          <span className="text-[#FFFFFF] font-medium text-sm">New Chat</span>
        </button>
      </div>
    </>
  );
};

export default NewChatButton;
