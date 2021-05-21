import * as types from './constants';

export const getPrograms = () => ({
  type: types.GET_PROGRAMS_REQUEST,
});

export const getUsersByIds = userIds => ({
  type: types.GET_USER_LIST_REQUEST,
  userIds,
});

export const clearData = () => ({
  type: types.CLEAR_DATA,
});
