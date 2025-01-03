"use client";
import { SendHorizonal, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChatHistory, sendMessage } from "@/store/chatSlice";
import { AppDispatch, RootState } from "@/store/store";
import Loader from "../Loader";

interface ChatProps {
  id: string;
}

const Chat: React.FC<ChatProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { chatHistory, loading } = useSelector(
    (state: RootState) => state.chat
  );

  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    dispatch(sendMessage({ prompt, chatHistory, uid: id }));
    setPrompt("");
  };

  useEffect(() => {
    dispatch(fetchChatHistory(id));
  }, [dispatch, id]);

  return (
    <div className="text-xl flex flex-col justify-between w-full h-[90vh] lg:h-screen py-4 bg-[#202123]">
      <div className="flex flex-col justify-start items-center space-y-3 w-full">
        <div className="w-full overflow-y-auto h-[75vh] lg:h-[80vh] px-2 lg:px-6 scrollbar-thin">
          {chatHistory.length === 0 ? (
            <div className="text-center text-[#FFFFFF] h-full w-full flex items-center justify-center">
              Start chatting with ChatGPT!
            </div>
          ) : (
            chatHistory.map((chat) => (
              <div
                className="text-[#FFFFFF] p-4 rounded-lg space-y-3 lg:space-y-6"
                key={chat.id}
              >
                <div className="flex p-3 justify-start items-center space-x-3 lg:space-x-8 w-full mx-auto">
                  <div className="flex justify-center items-center p-2 bg-purple-600 rounded-xl flex-col">
                    <User className="text-[#ECECF1]" size={25} />
                  </div>
                  <p className="text-sm lg:text-lg">{chat.user}</p>
                </div>
                {/* <div className="flex bg-[#40414E] rounded-xl p-3 justify-start space-x-3 lg:space-x-8 w-full mx-auto items-start">
                  <div className="flex justify-center items-center p-2 bg-green-400 rounded-xl">
                    <Image
                      src="/chatgpt-logo.svg"
                      alt="ChatGPT Logo"
                      width={25}
                      height={25}
                    />
                  </div>
                  <p className="text-sm lg:text-lg">{chat.ai}</p>
                </div> */}
                <div className="flex bg-[#40414E] rounded-xl p-3 justify-start space-x-3 lg:space-x-8 w-full mx-auto items-start">
                  <div className="flex justify-center items-center p-2 bg-green-400 rounded-xl">
                    <Image
                      src="/chatgpt-logo.svg"
                      alt="ChatGPT Logo"
                      width={25}
                      height={25}
                    />
                  </div>
                  <div className="text-sm lg:text-lg text-[#FFFFFF] space-y-2">
                   {chat.ai.split(/(\*\*.*?\*\*)/g).map((segment, index) => {
      if (segment.startsWith('**') && segment.endsWith('**')) {
        // Bold segment
        return (
          <p key={index} className="font-bold text-lg">
            {segment.replace(/\*\*/g, '')}  {/* Remove asterisks for display */}
          </p>
        );
      }
      return <p key={index}>{segment.trim()}</p>;
    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-[90%] mx-auto flex justify-between items-center bg-[#40414E] rounded-xl px-4 py-2 lg:px-6 lg:py-3"
      >
        <input
          type="text"
          placeholder="Type your message"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-[#40414E] text-[#FFFFFF] text-base lg:text-2xl rounded-lg py-2 px-2 w-full outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className={`flex justify-center items-center ml-2 lg:ml-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <Loader />
          ) : (
            <SendHorizonal className="text-[#ECECF1]" size={25} />
          )}
        </button>
      </form>
    </div>
  );
};

export default Chat;
