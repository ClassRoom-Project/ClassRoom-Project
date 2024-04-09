import React from 'react';

const ReserveUserInfo = () => {
  return (
    <div className="rounded-md flex flex-col bg-white border border-black border-solid p-6">
      <p className="mb-6 text-lg font-bold ">연락처 입력</p>
      <div className="flex flex-col  mb-4">
        <p className="font-bold mb-1">계정 ID (알림 메일이 발송됩니다.)</p>
        <p>seifei@fsmfkl</p>
      </div>
      <div className="flex flex-col">
        <p className="font-bold mb-1">이름 (닉네임)</p>
        <p>망고젤리</p>
      </div>
      <button className="btn btn-ghost border border-solid border-gray-300 text-gray-500 h-[20px]">
        연락처 수정하기
      </button>
    </div>
  );
};

export default ReserveUserInfo;
