import { useModalStore } from '@/store/modalstore';

export const AlertModal = () => {
  const { isOpen, toggleModal } = useModalStore();
  // console.log(isOpen);

  return (
    <>
      <dialog className={`modal ${isOpen ? 'modal-open' : ''} `}>
        <div className="modal-box flex flex-col justify-center items-center">
          <p className="py-4">공용 모달입니다!</p>
          <button>닫기</button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={toggleModal}>close</button>
        </form>
      </dialog>
    </>
  );
};
