/* eslint-disable import/no-extraneous-dependencies */
import { Bounce, toast } from 'react-toastify';

function ToastNotification(type, text) {
  const obj = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
  };

  switch (type) {
    case 'info':
      toast.info(text, obj);
      break;
    case 'success':
      toast.success(text, obj);
      break;
    case 'warning':
      toast.warn(text, obj);
      break;
    case 'error':
      toast.error(text, obj);
      break;
    default:
      toast(text, obj);
  }
}

export default ToastNotification;
