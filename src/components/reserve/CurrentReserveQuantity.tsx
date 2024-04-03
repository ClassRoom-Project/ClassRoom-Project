'use client';

import { supabase } from '@/app/api/supabase/supabase';
import React, { useState } from 'react';

const CurrentReserveQuantity = ({ remainingQuantity, maxPeople }: { remainingQuantity: number; maxPeople: number }) => {
  const [count, setCount] = useState(remainingQuantity);
  console.log(remainingQuantity);

  const channel = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'class'
      },
      (payload) => {
        setCount(maxPeople - payload.new.reserved_count);
      }
    )
    .subscribe();

  return <p>{`남은 자리 : ${count}`}</p>;
};

export default CurrentReserveQuantity;
