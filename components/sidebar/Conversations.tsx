import { MessageSquare, SquarePen, Trash2 } from 'lucide-react'
import React from 'react'

const Conversations = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 px-2 ">
    <div className="border-2 border-[#444654] rounded-md w-full h-11  flex items-center justify-between text-center px-2 space-x-2 bg-[#343540]">
      <MessageSquare
        className="w-[18px] h-[18px] text-[#ECECF1]"
        size={10}
      />
      <span className="text-[#ECECF1] font-medium text-sm truncate">
        Chat Conversaion
      </span>
      <div className="flex justify-center items-center space-x-1">
        <Trash2 className="w-[18px] h-[18px] text-[#ECECF1]" size={10} />
        <SquarePen
          className="w-[18px] h-[18px] text-[#ECECF1]"
          size={10}
        />
      </div>
    </div>
  </div>
  )
}

export default Conversations
