import { cancelReservation } from '@/app/api/mypage/fetchMyClasses';
import AskButton from '@/components/chatRooms/AskButton';
import { defaultWarning, successCancelReservation } from '@/components/common/Toastify';
import { ClassItem } from '@/types/register';
import { convertTimeTo12HourClock } from '@/utils/convertTimeTo12HourClock';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { GrLocation } from 'react-icons/gr';
import NoImage from '@/assets/images/clroom_no_img_purple.png';

const MyReservedClassItem = ({ classItem }: { classItem: ClassItem }) => {
  const queryClient = useQueryClient();

  // 예약한 클래스 취소 useMutation
  const { mutate: cancelReservaionMutation } = useMutation({
    mutationFn: (commentId: string) => cancelReservation(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reserve']
      });
    }
  });

  // 예약 취소
  const handleCancelReservation = async (reserve_id: string) => {
    if (window.confirm('정말 취소하시겠습니까?')) {
      try {
        await cancelReservaionMutation(reserve_id);
        successCancelReservation();
        // alert('예약이 취소되었습니다.');
      } catch (error) {
        console.error('예약 취소 중 오류 발생:', error);
        defaultWarning();
        // alert('예약 취소 중 오류가 발생했습니다.');
      }
    }
  };

  // 가격 콤마(,) 넣기
  const formattedPrice = classItem.reserve_price.toLocaleString();

  // 이미지 대표사진
  const mainImage = classItem.image && classItem.image.length > 0 ? classItem.image[0] : NoImage;

  return (
    <li className="align-center flex w-full flex-col items-center justify-center border-b-2 md:my-4 md:flex-row md:gap-4 md:py-4 lg:max-w-[1280px]">
      <div className="flex w-full flex-col items-center bg-pale-purple md:gap-4 lg:flex-row">
        <div className="overflow-hidden p-4 md:mt-8 md:p-0 lg:mx-8 lg:w-1/3">
          <div className="relative h-52 w-72">
            <Image
              src={mainImage}
              alt="클래스 대표 사진"
              fill={true}
              sizes="288px"
              className="p-4 md:p-0"
              style={{ objectFit: 'cover' }}
              priority={true}
            />
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-4 p-4">
          <div className="flex w-full justify-center gap-4 lg:justify-start">
            <p className="text-base font-bold text-dark-purple-color sm:text-lg md:pb-4 lg:pb-0 lg:pt-8">
              {classItem.title}
            </p>
          </div>
          <section className="flex flex-col">
            <div className="flex w-full flex-col overflow-hidden md:flex-row md:gap-4">
              <div className="flex flex-col md:flex-row md:gap-4 md:py-1">
                <div className="flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple">
                  <FaRegCalendarCheck color="#6C5FF7" className="size-4 md:size-5" />
                  <p className="whitespace-nowrap text-xs sm:text-sm md:text-base">날짜 : {classItem.day}</p>
                </div>
                <div className="flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple ">
                  <FaRegClock color="#6C5FF7" className="size-4 md:size-5" />
                  <p className="whitespace-nowrap text-xs sm:text-sm md:text-base">
                    시간 : {convertTimeTo12HourClock(classItem.times)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-4 md:py-1">
                <div className="inline-flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple ">
                  <GoPeople color="#6C5FF7" className="size-4 md:size-5" />
                  <p className="whitespace-nowrap text-xs sm:text-sm md:text-base">
                    예약 인원 : {classItem.reserve_quantity}명
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple ">
                  <BiMoneyWithdraw color="#6C5FF7" className="size-4 md:size-5" />
                  <p className="whitespace-nowrap text-xs sm:text-sm md:text-base">이용 금액 : {formattedPrice}원</p>
                </div>
              </div>
            </div>
            <div className="flex md:gap-4 md:py-1">
              <div className="inline-flex items-center gap-2 p-2 md:rounded-3xl md:border md:border-point-purple">
                <GrLocation color="#6C5FF7" className="size-4 md:size-5" />
                {classItem.location ? (
                  <p className="text-xs sm:text-sm md:text-base">
                    위치 : {classItem.location} {classItem.detail_location}
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm md:text-base">위치 정보가 없습니다.</p>
                )}
              </div>
            </div>
          </section>
          <section className="flex w-full items-center justify-center gap-4 p-2 md:gap-4 lg:right-4 lg:justify-end">
            <AskButton
              classId={classItem.class_id}
              makeClassUserId={classItem.user_id}
              buttonStyle="btn md:w-36 w-1/3 hover:bg-transparent text-xs md:text-sm hover:text-text-dark-gray"
            />
            <button
              className="btn w-1/3 whitespace-nowrap bg-dark-purple-color text-xs text-white  hover:bg-transparent hover:text-dark-purple-color md:w-36 md:text-sm"
              onClick={() => handleCancelReservation(classItem.reserve_id)}
            >
              예약 취소하기
            </button>
            <div className="btn w-1/3 whitespace-nowrap bg-point-purple text-xs text-white hover:bg-transparent hover:text-point-purple md:w-36 md:text-sm">
              <Link href={`list/detail/${classItem.class_id}`}>클래스 상세보기</Link>
            </div>
          </section>
        </div>
      </div>
    </li>
  );
};

export default MyReservedClassItem;
