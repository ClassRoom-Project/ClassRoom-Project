import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="h-[15px] bg-sky-400 z-50"></header>

      <div className="flex flex-row flex-grow">
        <div className="w-[100px] bg-sky-400 z-50"></div>

        <main className="flex-grow overflow-hidden bg-sky-400">
          <div className="h-full bg-white rounded-[20px] p-[15px]">{children}</div>
        </main>

        <div className="w-[15px] bg-sky-400 z-50"></div>
      </div>

      <footer className="h-[15px] bg-sky-400 z-50"></footer>
    </div>
  );
};

export default Layout;
