import Chat from "@/components/chats/Chat";
const ChatPage  = async({ params }: { params: { Id: string } }) => {
  const id:string = await  params.Id;
  return (
    <Chat id={id}/>
  );
};

export default ChatPage;
