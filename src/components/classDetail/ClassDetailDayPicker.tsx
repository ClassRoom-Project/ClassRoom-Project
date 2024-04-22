'use client';

//yarn add date-fns 설치
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; //이거안해주면 렌더링될때 이상하게뜹니당
import CustomCaption from '../common/CustomCaption';
import '../common/day-picker.css';

const bookedStyle = { border: '1px solid #6C5FF7', borderRadius: '100%', backgroundColor: '#6C5FF7', color: 'white' };

export default function App({ classDate }: { classDate: Array<{ day: string; date_id: string; class_id: string }> }) {
  if (!classDate || !Array.isArray(classDate)) {
    return null;
  }

  const bookedDays = classDate?.map((dateStr) => new Date(dateStr.day));

  return (
    <div className="flex flex-col min-w-full min-h-full items-center justify-center">
      <DayPicker
        mode="single"
        className="bg-white rounded-lg min-w-full min-h-[370px] flex items-center justify-center shadow-md"
        locale={ko}
        defaultMonth={bookedDays[0]}
        modifiers={{ booked: bookedDays }}
        modifiersStyles={{ booked: bookedStyle }}
        disabled={{ before: new Date() }}
        fromYear={new Date().getFullYear()}
        toYear={new Date().getFullYear() + 1} // 현재 년도 +1 까지만 navigate
        components={{ Caption: CustomCaption }}
      />
      <p className="mt-2 text-text-color">클래스가 있는 날을 확인하세요</p>
    </div>
  );
}
