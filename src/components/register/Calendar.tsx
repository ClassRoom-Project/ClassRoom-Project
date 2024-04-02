"use client";
import React from 'react'
import useRegisterStore from '../../store/RegisterStore';

const Calendar = () => {
    const { selectDay, setSelectDay } = useRegisterStore();
  return (
    <div className='my-1'>
        <p>날짜</p>
        {/* 날짜 달력 api 사용 */}
    </div>
  )
}

export default Calendar