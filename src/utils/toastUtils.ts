import { Toast } from 'toastify-react-native';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top' | 'center' | 'bottom';

/**
 * Show a toast notification
 * @param type - Type of toast ('success', 'error', 'warning', 'info')
 * @param titleOrMessage - Title (if message is provided) or message (if no third parameter)
 * @param message - Optional message (if title is provided)
 * @param position - Position of toast ('top', 'center', 'bottom')
 * @param duration - Duration in milliseconds
 */
export const ShowToast = (
  type: ToastType,
  titleOrMessage: string,
  message?: string,
  position: ToastPosition = 'top',
  duration: number = 4000,
) => {
  const finalMessage = message
    ? `${titleOrMessage}\n${message}`
    : titleOrMessage;

  const resolvedDuration = duration;

  switch (type) {
    case 'success':
      Toast.success(finalMessage, position, resolvedDuration);
      break;
    case 'error':
      Toast.error(finalMessage, position, resolvedDuration);
      break;
    case 'warning':
      Toast.warn(finalMessage, position, resolvedDuration);
      break;
    case 'info':
      Toast.info(finalMessage, position, resolvedDuration);
      break;
    default:
      Toast.success(finalMessage, position, resolvedDuration);
  }
};

// Convenience functions
export const showSuccessToast = (message: string, title?: string) => {
  ShowToast('success', title || message, title ? message : undefined);
};

export const showErrorToast = (message: string, title?: string) => {
  ShowToast('error', title || message, title ? message : undefined);
};

export const showWarningToast = (message: string, title?: string) => {
  ShowToast('warning', title || message, title ? message : undefined);
};

export const showInfoToast = (message: string, title?: string) => {
  ShowToast('info', title || message, title ? message : undefined);
};
