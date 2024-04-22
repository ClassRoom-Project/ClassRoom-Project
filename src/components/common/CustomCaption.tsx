import { format } from 'date-fns';
import React from 'react';
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ko } from 'date-fns/locale';

const CustomCaption = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  return (
    <h2 className="flex justify-between">
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className="bg-point-purple rounded-full text-white w-6  flex justify-center items-center"
      >
        <IoIosArrowBack size={18} className=" mr-[2px]" />
      </button>
      <div className="flex justify-center font-bold">{format(props.displayMonth, 'uuuu년 LLLL', { locale: ko })}</div>
      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className="bg-point-purple rounded-full text-white w-6  flex justify-center items-center"
      >
        <IoIosArrowForward size={18} className=" ml-[2px]" />
      </button>
    </h2>
  );
};

export default CustomCaption;
