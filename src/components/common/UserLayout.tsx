import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[15px] bg-sky-400 z-50"></header>

      <div className="fixed p-3 top-0 bottom-0 min-h-screen flex flex-col justify-between items-center left-0 w-[100px] bg-sky-400 z-40">
        <div className=" mt-[100px]">
          <div>class</div>
          <div>chat</div>
          <div>create</div>
          <div>settings</div>
        </div>
        <div>
          <div>convert</div>
          <div>logout</div>
        </div>
      </div>

      <div className="fixed top-0 bottom-0 min-h-screen right-0 w-[15px] bg-sky-400 z-40"></div>

      <main className="pt-[15px] pl-[100px] pr-[15px]">{children}</main>

      <footer className="fixed bottom-0 left-0 right-0 h-[15px] bg-sky-400 z-50"></footer>
    </>
  );
};

export default Layout;
