import Image from "next/image";

const AuthPage = () => {
  return (
    <div className="bg-[#343541] text-[#FFFFFF] justify-center items-center flex h-full">
      <div className="justify-center items-center flex flex-col">
        <Image
          src="/chatgpt-logo.png"
          alt="ChatGPT Logo"
          width={100}
          height={100}
          className="w-10 h-10"
        />
        <div className="mt-[20px] mb-[14px] flex flex-col justify-center items-center leading-7 font-medium tex text-sm">
          <h1>Welcome to ChatGPT</h1>
          <p>Login with your OpenAi account to contine</p>
        </div>
        <div className="flex justify-between items-center space-x-4">
        <button className="bg-[#0FA47F] text-[#FFFFFF] w-[66px] h-[34px] py-2 text-sm rounded-md flex justify-center items-center text-center">Login</button>
              <button className="bg-[#0FA47F] text-[#FFFFFF] w-[75px] h-[34px] py-2 text-sm rounded-md flex justify-center items-center text-center">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
