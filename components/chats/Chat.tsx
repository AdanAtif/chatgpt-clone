// "use client";
// import { SendHorizonal, User } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// type ChatEntry = { user: string; ai: string };
// export const Chat = () => {
//   const [prompt, setPrompt] = useState("");
//   const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: any) => {
//     console.log("submitting");

//     e.preventDefault();
//     if (!prompt.trim()) return; // Prevent empty submissions

//     setLoading(true);
//     try {
//       const genAI = new GoogleGenerativeAI(
//         "AIzaSyCETKeMmFnEMhVQdBL-sjhCFQDfRGxnfYI"
//       );
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//       const result = await model.generateContent(prompt);
//       const aiResponse = result.response.text();

//       // Update chat history
//       setChatHistory((prev) => [...prev, { user: prompt, ai: aiResponse }]);
//       setPrompt(""); // Clear the input field
//     } catch (error) {
//       console.error("Error generating AI response:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="text-3xl flex flex-col justify-between w-full lg:h-screen h-[90%] py-4">
//       <div className="flex flex-col justify-start items-center space-y-3">
//         <div />
//         <div
//           className="w-full overflow-y-auto h-[85vh]" // Added height and scroll
//         >
//           {chatHistory.length === 0 ? (
//             <div className="text-center text-[#FFFFFF] h-full w-full flex items-center justify-center">
//               Start chatting with ChatGPT!
//             </div>
//           ) : (
//             chatHistory.map((chat, index) => (
//               <div
//                 className="text-[#FFFFFF] p-4 rounded-lg lg:space-y-6 space-y-3"
//                 key={index}
//               >
//                 <div className="flex p-3 justify-start items-center lg:space-x-8 space-x-3 w-auto lg:w-[90%] mx-auto">
//                   <div className="flex justify-center items-center p-2 bg-purple-600 rounded-xl">
//                     <User className="text-[#ECECF1]" size={35} />
//                   </div>

//                   <p>{chat.user}</p>
//                 </div>
//                 <div className="flex bg-[#40414E] rounded-xl p-3 justify-start lg:space-x-8 space-x-3 w-auto lg:w-[90%] mx-auto items-start">
//                   <div className="flex justify-center items-center p-2 bg-green-400 rounded-xl min-h-3 min-w-3">
//                     <Image
//                       src="/chatgpt-logo.svg"
//                       alt="ChatGPT Logo"
//                       width={35}
//                       height={35}
//                     />
//                   </div>
//                   <p>{chat.ai}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="w-[90%] mx-auto flex justify-between items-center bg-[#40414E] rounded-xl px-4 py-2"
//       >
//         <input
//           type="text"
//           placeholder="Type your message"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           className="bg-[#40414E] text-[#FFFFFF] text-2xl rounded-lg py-2 px-2 w-full outline-none"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex justify-center items-center"
//         >
//           <SendHorizonal className="text-[#ECECF1]" size={30} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
"use client";
import { SendHorizonal, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const { GoogleGenerativeAI } = require("@google/generative-ai");

type ChatEntry = { user: string; ai: string };
export const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    console.log("submitting");

    e.preventDefault();
    if (!prompt.trim()) return; // Prevent empty submissions

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyCETKeMmFnEMhVQdBL-sjhCFQDfRGxnfYI"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      // Update chat history
      setChatHistory((prev) => [...prev, { user: prompt, ai: aiResponse }]);
      setPrompt(""); // Clear the input field
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="text-xl flex flex-col justify-between w-full h-[90vh] lg:h-screen py-4 bg-[#202123]">
      <div className="flex flex-col justify-start items-center space-y-3 w-full">
        <div
          className="w-full overflow-y-auto h-[75vh] lg:h-[80vh] px-2 lg:px-6 scrollbar-thin  "
        >
          {chatHistory.length === 0 ? (
            <div className="text-center text-[#FFFFFF] h-full w-full flex items-center justify-center">
              Start chatting with ChatGPT!
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div
                className="text-[#FFFFFF] p-4 rounded-lg space-y-3 lg:space-y-6"
                key={index}
              >
                {/* User Message */}
                <div className="flex p-3 justify-start items-center space-x-3 lg:space-x-8 w-full mx-auto">
                  <div className="flex justify-center items-center p-2 bg-purple-600 rounded-xl">
                    <User className="text-[#ECECF1]" size={25} />
                  </div>
                  <p className="text-sm lg:text-lg">{chat.user}</p>
                </div>
                {/* AI Response */}
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
          className="flex justify-center items-center ml-2 lg:ml-4"
        >
          <SendHorizonal className="text-[#ECECF1]" size={25} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
