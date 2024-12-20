"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Plus } from "lucide-react";
import Conversations from "./Conversations";
import NewChatButton from "./newChat-button";
import SettingForm from "./settings-form";
import { useEffect, useState } from "react";

export const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted ) {
    return null;
  }
  return (
    <>
      <div className="w-full">
        <Sheet>
          <SheetTrigger asChild>
            <AlignJustify className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#202123] text-white border-white h-full">
              <SheetTitle className="text-white">Your Conversations</SheetTitle>
              <div className="h-full w-full">
              <div className="w-[250px] bg-[#202123] h-full rounded-sm shadow-lg shadow-[#202123] flex flex-col justify-between ">
              <div>
              <NewChatButton/>
              <Conversations />   
                    </div>
                    <SettingForm/>
                    </div>
               
              </div>
            
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
