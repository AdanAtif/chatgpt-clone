import DesktopSidebar from "./desktop-sidebar";
import { MobileSidebar } from "./mobile-sidebar";

export const Sidebar = () => {
  return (
    <div >
      {/* Mobile Nav */}
      <div className="w-screen block lg:hidden">
        <div className="w-full flex justify-between items-center  p-4">
          <h1 className="text-lg font-semibold">Chat name</h1>
          <div className="flex">
            <MobileSidebar />
          </div>
        </div>
      </div>
      {/* Destop Nav */}
      <div className="w-full hidden lg:block h-full">
      <DesktopSidebar/>
      </div>
   
    </div>
  );
};

export default Sidebar;
