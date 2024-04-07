//todo : 폼 클릭 이벤트 추가

export const SearchClass = () => {
  return (
    <form className="h-[120px] flex items-center justify-center">
      <input
        type="text"
        placeholder="클래스 검색"
        className="input input-bordered border-[#5373FF] input-info w-full max-w-xs"
      />
      <button type="submit" className="btn text-white bg-[#5373FF] ml-2">
        Button
      </button>
    </form>
  );
};
