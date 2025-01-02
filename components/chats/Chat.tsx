// "use client";
// import { SendHorizonal, User } from "lucide-react";
// import Image from "next/image";
// import { use, useEffect, useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { addDoc, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
// import { db } from "@/database/db";
// import { Timestamp } from "firebase/firestore";

// type ChatEntry = { user: string; ai: string; uid: string,id:string,date: any; };
// interface ChatProps {
//   id :string;
// }

// export const Chat: React.FC<ChatProps> = ({id}) => {
//   const [prompt, setPrompt] = useState("");
//   const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
//   const [loading, setLoading] = useState(false);

  
  
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;
  
//     setLoading(true);
//     try {
//       const genAI = new GoogleGenerativeAI(`${process.env.NEXT_PUBLIC_API_AI}`);
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
//       const chat = model.startChat({
//         history: chatHistory.map((chat) => ({
//           role: "user",
//           parts: [{ text: chat.user }],
//         })),
//       });
  
//       const result = await chat.sendMessage(prompt);
//       const aiResponse = await result.response.text();
  
//       const newChat = {
//         user: prompt,
//         ai: aiResponse,
//         uid: id,
//         date: Timestamp.now(), // Use Firestore's timestamp
//       };
//       const docRef = await addDoc(collection(db, "chats"), newChat);
  
//       setChatHistory((prev) => [...prev, { ...newChat, id: docRef.id }]);
//       setPrompt("");
//     } catch (error) {
//       console.error("Error generating AI response:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
  
  

//   const  fetchChatHistory = async () => {
//     try {
//       const q = query(
//         collection(db, "chats"),
//         where("uid", "==", id),
       
//       );
      
//       const querySnapshot = await getDocs(q);
//       console.log("querySnapshot",querySnapshot);
      
//       const chats = querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//         date: doc.data().timestamp, 
//       }) as ChatEntry);
  
//       setChatHistory(chats);
      
//     } catch (error) {
//       console.error('Error fetching initial responses:', error);
//     }
//   };
  
  

//   useEffect(() => {
//     fetchChatHistory();
//   });

//   return (
//     <div className="text-xl flex flex-col justify-between w-full h-[90vh] lg:h-screen py-4 bg-[#202123]">
//       <div className="flex flex-col justify-start items-center space-y-3 w-full">
//         <div
//           className="w-full overflow-y-auto h-[75vh] lg:h-[80vh] px-2 lg:px-6 scrollbar-thin  "
//         >
//           {chatHistory.length === 0 ? (
//             <div className="text-center text-[#FFFFFF] h-full w-full flex items-center justify-center">
//               Start chatting with ChatGPT!
//             </div>
//           ) : (
//             chatHistory.map((chat, index) => (
//               <div
//                 className="text-[#FFFFFF] p-4 rounded-lg space-y-3 lg:space-y-6"
//                 key={index}
//               >
//                 {/* User Message */}
//                 <div className="flex p-3 justify-start items-center space-x-3 lg:space-x-8 w-full mx-auto">
//                   <div className="flex justify-center items-center p-2 bg-purple-600 rounded-xl">
//                     <User className="text-[#ECECF1]" size={25} />
//                   </div>
//                   <p className="text-sm lg:text-lg">{chat.user}</p>
//                 </div>
//                 {/* AI Response */}
//                 <div className="flex bg-[#40414E] rounded-xl p-3 justify-start space-x-3 lg:space-x-8 w-full mx-auto items-start">
//                   <div className="flex justify-center items-center p-2 bg-green-400 rounded-xl">
//                     <Image
//                       src="/chatgpt-logo.svg"
//                       alt="ChatGPT Logo"
//                       width={25}
//                       height={25}
//                     />
//                   </div>
//                   <p className="text-sm lg:text-lg">{chat.ai}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="w-[90%] mx-auto flex justify-between items-center bg-[#40414E] rounded-xl px-4 py-2 lg:px-6 lg:py-3"
//       >
//         <input
//           type="text"
//           placeholder="Type your message"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           className="bg-[#40414E] text-[#FFFFFF] text-base lg:text-2xl rounded-lg py-2 px-2 w-full outline-none"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex justify-center items-center ml-2 lg:ml-4"
//         >
//           <SendHorizonal className="text-[#ECECF1]" size={25} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
'use client';
import { SendHorizonal, User } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatHistory, sendMessage } from '@/store/chatSlice';
import { AppDispatch, RootState } from "@/store/store";
import Loader from '../Loader';

interface ChatProps {
  id: string;
}

const Chat: React.FC<ChatProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { chatHistory, loading } = useSelector((state: RootState) => state.chat);

  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    dispatch(sendMessage({ prompt, chatHistory, uid: id }));
    setPrompt('');
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
            chatHistory.map((chat, index) => (
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
                <div className="flex bg-[#40414E] rounded-xl p-3 justify-start space-x-3 lg:space-x-8 w-full mx-auto items-start">
                  <div className="flex justify-center items-center p-2 bg-green-400 rounded-xl">
                    <Image
                      src="/chatgpt-logo.svg"
                      alt="ChatGPT Logo"
                      width={25}
                      height={25}
                    />
                  </div>
                  <p className="text-sm lg:text-lg">{chat.ai}</p>
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
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <Loader/>
          ) : (
            <SendHorizonal className="text-[#ECECF1]" size={25} />
          )}
        </button>
      </form>
    </div>
  );
};

export default Chat;
