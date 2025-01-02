import Sidebar from "@/components/sidebar/Sidebar";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'ChatGPT Clone',
  description: 'ChatGPT Clone by @adan-atif',
}
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full" suppressHydrationWarning>
      <div className="bg-[#343541] text-[#FFFFFF] lg:flex lg:justify-start h-screen ">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};
export default HomeLayout;
