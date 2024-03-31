import React, { PropsWithChildren } from 'react';

const BorderLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[15px] bg-[#F0F6FF] z-50"></header>

      <div className="fixed top-0 bottom-0 min-h-screen right-0 w-[15px] bg-[#F0F6FF] z-50"></div>

      <main className="bg-[#F0F6FF] p-[15px] pl-[100px]">
        <div className="h-full bg-white rounded-[20px] p-[5px]">{children}</div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-[15px] bg-[#F0F6FF] z-50"></footer>
    </>
  );
};

export default BorderLayout;
