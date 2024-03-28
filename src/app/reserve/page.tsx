import Image from 'next/image';

export default function ReservePage() {
  return (
    <div className="w-[1600px] h-[800px]">
      <h1 className="text-xl">예약하기</h1>
      <div className="flex w-full h-full bg-gray-200 p-6">
        <div className="w-2/5 flex flex-col gap-4">
          <div>
            <h1 className="mb-1">날짜 선택</h1>
            <div>달력칸</div>
          </div>
          <div>
            <h1 className="mb-1">시간 선택</h1>
            <div className="flex gap-2">
              <button className="px-4 py-1 text-lg bg-white tracking-wide rounded-lg">14:30</button>
              <button className="px-4 py-1 text-lg bg-pink-200 tracking-wide rounded-lg">16:30</button>
            </div>
          </div>
          <div>
            <h1 className="mb-1">선택하신 수강일</h1>
            <span>2024-03-26 16:00</span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center w-full p-6">
          <div className="p-2 gap-2 w-full flex h-28 border border-solid border-black">
            <Image
              width={100}
              height={100}
              src={`https://www.datocms-assets.com/23496/1647375064-sfadf.png?auto=format&fit=max&w=1200`}
              alt="클래스 이미지"
              unoptimized={true}
            />
            <div className="flex flex-col">
              <span>[카테고리] 클래스 이름</span>
              <span>위치</span>
              <span>가격</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center w-96 p-4 border border-solid border-black">
            <div className="flex gap-4">
              <span className="w-16 text-right">금액</span>
              <span> 50,000 </span>
            </div>
            <div className="flex gap-4">
              <span className="w-16 text-right">인원</span>
              <button> - </button>
              <span> 1 </span>
              <button> + </button>
            </div>
            <div className="flex gap-4">
              <span className="w-16 text-right">총 금액</span>
              <span> 50,000 </span>
            </div>
          </div>
          <button className="bg-white w-32 text-center self-end">예약하기</button>
        </div>
      </div>
    </div>
  );
}
