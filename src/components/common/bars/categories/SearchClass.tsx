//todo : 폼 클릭 이벤트 추가

export const SearchClass = () => {
  return (
    <form className="h-[120px] flex items-center justify-center">
      <input
        type="text"
        placeholder="클래스 검색"
        className="input input-bordered border-[#F0F6FF] input-info w-full max-w-xs"
      />
      <button type="submit" className="btn bg-[#F0F6FF] ml-2">
        Button
      </button>
    </form>
  );
};
