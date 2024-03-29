import React, { PropsWithChildren } from 'react';

const BorderLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="fixed p-3 top-0 bottom-0 min-h-screen flex flex-col justify-between items-center left-0 w-[100px] bg-[#F0F6FF] z-50">
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
    </>
  );
};

export default BorderLayout;
