import { useModalStore } from '@/store/modalstore';

export const AlertModal = ({ btn1, btn2, text }: { btn1: string; btn2: string; text: string }) => {
  const { isOpen, toggleModal } = useModalStore();
  // console.log(isOpen);

  return (
    <>
      <dialog className={`modal ${isOpen ? 'modal-open' : ''} `}>
        <div className="modal-box flex flex-col items-center justify-center">
          <p className="py-4">{text}</p>
          <div className="flex items-center justify-center">
            <button>{btn1}</button>
            <button>{btn2}</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={toggleModal}>close</button>
        </form>
      </dialog>
    </>
  );
};
