"use client";
import React, { useState } from 'react'

const Calendar = () => {
    const [selectDay, setSelectDay] = useState(''); // 달력
  return (
    <div className='my-1'>
        <p>날짜</p>
        {/* 날짜 달력 api 사용 */}
    </div>
  )
}

export default Calendar