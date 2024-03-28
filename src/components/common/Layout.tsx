import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[50px] bg-sky-400 z-50"></header>

      <div className="fixed top-10 bottom-0 left-0 w-[100px] bg-sky-400 z-50"></div>

      <div className="fixed top-10 bottom-0 right-0 w-[20px] bg-sky-400 z-50"></div>

      <main className="pt-[50px] pl-[100px] pr-[20px]">{children}</main>

      <footer className="fixed bottom-0 left-0 right-0 h-[20px] bg-sky-400 z-50"></footer>
    </>
  );
};

export default Layout;
