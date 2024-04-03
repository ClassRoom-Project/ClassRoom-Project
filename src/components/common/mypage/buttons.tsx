export const EditButton = () => {
  const handleOnClickEditBtn = () => {
    alert('수정하기 버튼입니다!');
  };
  return (
    <button onClick={handleOnClickEditBtn} className="p-4 border rounded-xl w-[150px]">
      수정하기
    </button>
  );
};

export const CancleButton = () => {
  const handleOnClickCancleBtn = () => {
    alert('취소하기 버튼입니다!');
  };

  return (
    <button onClick={handleOnClickCancleBtn} className="p-4 border rounded-xl w-[150px]  bg-rose-500 text-white">
      취소하기
    </button>
  );
};

export const GoToClassPost = () => {
  const handleMoveToClassPostBtn = () => {
    alert('클래스 디테일 페이지로 이동합니다.');
  };
  return (
    <button onClick={handleMoveToClassPostBtn} className="btn">
      클래스 보러가기
    </button>
  );
};
