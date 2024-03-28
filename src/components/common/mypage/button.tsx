export const EditButton = () => {
  const handleOnClickEditBtn = () => {
    alert('수정하기 버튼입니다.');
  };
  return (
    <button onClick={handleOnClickEditBtn} className="p-4 border rounded-xl ">
      수정하기
    </button>
  );
};

export const CancleButton = () => {
  const handleOnClickCancleBtn = () => {
    alert('취소하기 버튼입니다.');
  };
  return (
    <button onClick={handleOnClickCancleBtn} className="p-4 border rounded-xl">
      취소하기
    </button>
  );
};
