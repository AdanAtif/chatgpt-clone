import NewChatButton from "./newChat-button";
import Conversations from "./Conversations";
import SettingForm from "./settings-form";

export const DesktopSidebar = () => {
  return (
    <div className="w-[250px] bg-[#202123] h-full rounded-sm shadow-lg shadow-[#202123] flex flex-col justify-between ">
      <div>
        <NewChatButton/>
       <Conversations/>
      </div>
     <SettingForm/>
    </div>
  );
};

export default DesktopSidebar;
