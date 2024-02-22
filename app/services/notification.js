import CapNotification from '@capillarytech/cap-ui-library/CapNotification';

export function showSuccessNotifiction(message) {
  CapNotification.success({
    message,
    onClick: () => {},
    duration: 2,
  });
}

export function showErrorNotifiction(message = 'Some error occured') {
  CapNotification.error({
    message,
    onClick: () => {},
    duration: 2,
  });
}
