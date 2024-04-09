import { toast } from 'react-toastify';
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
  toast.error('클래스를 예약하는 도중 오류가 발생했습니다.', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });
