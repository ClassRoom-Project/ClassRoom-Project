import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CaptionProps, useNavigation } from 'react-day-picker';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const CustomCaption = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  return (
    <h2 className="flex justify-between">
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className="flex w-6 items-center justify-center  rounded-full bg-point-purple text-white"
      >
        <IoIosArrowBack size={18} className=" mr-[2px]" />
      </button>
      <div className="flex justify-center font-bold">{format(props.displayMonth, 'uuuu년 LLLL', { locale: ko })}</div>
      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className="flex w-6 items-center justify-center  rounded-full bg-point-purple text-white"
      >
        <IoIosArrowForward size={18} className=" ml-[2px]" />
      </button>
    </h2>
  );
};

export default CustomCaption;
