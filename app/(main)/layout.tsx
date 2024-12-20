const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="h-full" suppressHydrationWarning>{children}</div>;
  };
  export default HomeLayout;