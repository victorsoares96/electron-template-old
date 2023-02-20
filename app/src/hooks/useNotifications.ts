import { useCallback, useMemo } from 'react';

import { SnackbarKey } from 'notistack';

import { Notification } from '@src/store/notification/types';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
  removeSnackbar as removeSnackbarAction,
} from '@src/store/notification/notification.slice';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export function useNotifications() {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(
    state => state.notification.notifications,
  );

  const enqueueSnackbar = useCallback(
    (notification: Partial<Notification>) =>
      dispatch(enqueueSnackbarAction(notification)),
    [dispatch],
  );
  const closeSnackbar = useCallback(
    (key: SnackbarKey, dismissAll = !key) =>
      dispatch(closeSnackbarAction(key, dismissAll)),
    [dispatch],
  );
  const removeSnackbar = useCallback(
    (key: SnackbarKey) => dispatch(removeSnackbarAction(key)),
    [dispatch],
  );

  const actions = useMemo(
    () => ({ enqueueSnackbar, closeSnackbar, removeSnackbar }),
    [enqueueSnackbar, closeSnackbar, removeSnackbar],
  );
  return { notifications, ...actions };
}
