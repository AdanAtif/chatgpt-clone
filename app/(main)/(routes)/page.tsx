import Chat from "@/components/chats/Chat";
import Sidebar from "@/components/sidebar/Sidebar";

const HomePage = () => {
  return (
    <div className="bg-[#343541] text-[#FFFFFF] lg:flex lg:justify-start h-screen ">
    <Sidebar />
    <Chat />
  </div>
  );
};

export default HomePage;
