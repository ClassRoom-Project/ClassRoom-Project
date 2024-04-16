import React from 'react';
import ClassInfo from './ClassInfo';
import ReserveUserInfo from './ReserveUserInfo';
import { ReserveClassType } from '@/types/class';

const ClassAndUserInfo = ({ classInfo }: { classInfo: ReserveClassType }) => {
  return (
    <div className="flex box-border flex-col w-[400px] my-2">
      <ClassInfo classInfo={classInfo} />
      <ReserveUserInfo />
    </div>
  );
};

export default ClassAndUserInfo;
