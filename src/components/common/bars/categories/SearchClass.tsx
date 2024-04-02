export const SearchClass = () => {
  return (
    <div className="h-[120px] border-b-[1px] border-solid border-gray-300 flex flex-col items-center justify-center">
      <input
        type="text"
        placeholder="클래스명을 입력하세요"
        className="input input-bordered input-info w-full max-w-xs"
      />
      <button className="btn my-3">Button</button>
    </div>
  );
};
