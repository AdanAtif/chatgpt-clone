import { LogOut, Moon, Sun, Trash2, User } from 'lucide-react'
import React from 'react'

const SettingForm = () => {
  return (
    <div className="flex flex-col space-y-6 my-6">
        <hr className="border-t-2 border-t-[FFFFFF] rounded-xl mx-2"/>
    
        <div className="flex  items-center space-x-2 mx-2">
           <Trash2 className="w-[18px] h-[18px] text-[#ECECF1]" size={10} />
          <span className="text-[#ECECF1] font-medium text-sm">Clear Conversations</span>
        </div>
        <div className="flex  items-center space-x-2 mx-2">
           <Sun className="w-[18px] h-[18px] text-[#ECECF1]" size={10} />
          <span className="text-[#ECECF1] font-medium text-sm">Light Mode</span>
        </div>
        <div className="flex  items-center space-x-2 mx-2">
           <Moon className="w-[18px] h-[18px] text-[#ECECF1]" size={10} />
          <span className="text-[#ECECF1] font-medium text-sm">Dark Mode</span>
        </div>
        <div className="flex  items-center space-x-2 mx-2">
           <User className="w-[18px] h-[18px] text-[#ECECF1]" size={10} />
          <span className="text-[#ECECF1] font-medium text-sm">Profile</span>
        </div>
        <div className="flex  items-center space-x-2 mx-2">
        <LogOut className="w-[18px] h-[18px] text-[#ECECF1]" size={10} />
        <span className="text-[#ECECF1] font-medium text-sm">Log out</span>
        </div>
      </div>
  )
}

export default SettingForm
