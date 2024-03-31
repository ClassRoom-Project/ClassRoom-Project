'use client';

import React, { useEffect } from 'react';
import ClassCard from './ClassCard';
import { useClassInfoStore } from '@/store/ClassInfoStore';
import { fetchClassInfos } from '@/api/supabase/fetchClassInfo';
const BestClass = () => {
  const { classInfos, setClassInfos } = useClassInfoStore();

  useEffect(() => {
    const getClassInfos = async () => {
      const infos = await fetchClassInfos();
      setClassInfos(infos);
    };
    getClassInfos();
  }, []);

  return (
    <div>
      <p>BestClass</p>
      <div className="w-[85vw] overflow-auto flex justify-between p-2 items-center bg-slate-500">
        {classInfos.map((info, classId) => (
          <ClassCard key={classId} classInfos={info} />
        ))}
      </div>
    </div>
  );
};

export default BestClass;
