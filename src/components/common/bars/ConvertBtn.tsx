'use client';

import React from 'react';

const ConvertBtn = () => {
  const handleOnClickChangedRoleBtn = () => {
    alert('수강생/선생님으로 전환됩니다.');
  };
  return (
    <button className="p-5" onClick={handleOnClickChangedRoleBtn}>
      convert
    </button>
  );
};

export default ConvertBtn;
