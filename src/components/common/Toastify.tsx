import { Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const noChangedNotify = () =>
  toast.error('수정 사항이 없습니다.', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

export const changeInfoNotify = () =>
  toast.info('프로필 수정이 완료되었습니다.', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

export const noInfoNotify = () =>
  toast.error('입력되지 않은 정보가 있습니다.', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

export const alreadyReserved = () =>
  toast.info('이미 예약하신 클래스입니다.', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

export const quantityWarning = () =>
  toast.info('예약은 최소 1명 이상부터 가능합니다.', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

export const invalidReserve = () =>
  toast.error('클래스 예약을 완료하는 도중 오류가 발생했습니다.', {
    position: 'top-right',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });
export const commentWarning = () =>
  toast.error('후기를 10자 이상 입력해주세요', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

export const commentStarWarning = () =>
  toast.error('별점을 입력해 주세요', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

export const commentLoginWarning = () =>
  toast.error('로그인후 작성할 수 있습니다', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

export const defaultWarning = () =>
  toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요.', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

export const addWish = () =>
  toast('❤️ 위시리스트에 추가했습니다.', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    theme: 'light'
  });

export const cancelWish = () =>
  toast('🤍 위시리스트에서 삭제했습니다.', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    theme: 'light'
  });

export const successCancelReservation = () =>
  toast.success('예약이 취소되었습니다.', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    theme: 'light'
  });

export const checkFormValidation = () =>
  toast.error('양식에 맞는 값을 입력해주세요.', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    theme: 'light'
  });

export const deleteRoom = () =>
  toast('방이 삭제되었습니다.', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    theme: 'light'
  });

export const noDateTimeNotify = () =>
  toast.error('일정과 시간을 선택해주세요.', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

export const noLimitImageNotify = () =>
  toast.error('최대 5개의 이미지만 추가할 수 있습니다.', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });
