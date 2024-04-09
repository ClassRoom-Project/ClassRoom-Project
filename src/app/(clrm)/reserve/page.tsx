import ClassInfo from '@/components/reserve/ClassInfo';
import DateTimePicker from '@/components/reserve/DateTimePicker';
import PriceCalculator from '@/components/reserve/PriceCalculator';
import ReserveButton from '@/components/reserve/ReserveButton';
import CurrentReserveQuantity from '@/components/reserve/CurrentReserveQuantity';
import { newFetchReserveClassInfo } from '@/app/api/reserve/fetchReserveClassInfo';

export default async function ReservePage({ searchParams }: { searchParams: { classId: string } }) {
  const classId = searchParams.classId;
  const classInfo = await newFetchReserveClassInfo(classId);

  return (
    <>
      <h1 className="text-xl">클래스 상세보기</h1>
      <div className="w-full min-h-screen  bg-violet-100 flex justify-center items-center flex-col text-gray-600">
        {classInfo ? (
          <div className="flex h-full gap-10 justify-between bg-violet-200">
            <div className="flex flex-col w-[500px] bg-gray-200">
              <div className="p-6 pb-12 bg-white mb-6 rounded-md  border border-black border-solid ">
                <p>선택하신 클래스</p>
                <div className="w-full p-4 h-[250px] border border-solid border-black mb-4">사진자리</div>
                <div className="px-2 flex-col flex gap-1">
                  <h1 className="font-bold text-xl mb-4">클래스 타이틀</h1>
                  <p className="font-bold">
                    클래스 유형 : <span className="font-normal">원데이 ㅋㅋ</span>
                  </p>
                  <p className="font-bold">
                    클래스 소요시간 : <span className="font-normal">원데이 ㅋㅋ</span>
                  </p>
                  <p className="font-bold">
                    클래스 난이도 : <span className="font-normal">원데이 ㅋㅋ</span>
                  </p>
                  <p className="font-bold">
                    위치: <span className="font-normal">원데이 ㅋㅋ</span>
                  </p>
                  <p className="font-bold">
                    1인당 수강 금액 : <span className="font-normal">원데이 ㅋㅋ</span>
                  </p>
                </div>
              </div>
              <div className="rounded-md flex flex-col bg-white border border-black border-solid p-6">
                <p className="mb-6 text-lg font-bold ">연락처 입력</p>
                <div className="flex flex-col  mb-4">
                  <p className="font-bold mb-1">계정 ID (알림 메일이 발송됩니다.)</p>
                  <p>seifei@fsmfkl</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold mb-1">이름 (닉네임)</p>
                  <p>망고젤리</p>
                </div>
                <button className="btn btn-ghost border border-solid border-gray-300 text-gray-500 h-[20px]">
                  연락처 수정하기
                </button>
              </div>
            </div>

            <div className=" p-6 w-[460px] pb-12 bg-white rounded-md  border border-black border-solid flex flex-col items-center">
              <p className="font-bold text-lg text-left w-full mb-6">수강요일 & 시간 선택하기</p>
              <div className="w-4/5 mb-10 border-black border-solid border">데이피커 자리</div>
              <div className="w-4/5 mb-10 border-black border-solid border">계산기 자리</div>
              <button className="btn btn-primary w-4/5">결제하기</button>
            </div>

            {/* <DateTimePicker classDates={classInfo.dates} />
            <ClassInfo classInfo={classInfo} />
            <CurrentReserveQuantity classId={classInfo.classId} maxPeople={classInfo?.maxPeople} />
            <PriceCalculator price={classInfo.price} classId={classInfo.classId} maxPeople={classInfo.maxPeople} />
            <ReserveButton classId={classInfo.classId} maxPeople={classInfo.maxPeople} /> */}
          </div>
        ) : (
          <p>클래스 정보를 불러오는데 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
        )}
      </div>
    </>
  );
}
