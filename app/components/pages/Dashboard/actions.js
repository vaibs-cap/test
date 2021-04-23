import * as types from './constants';

export const getPrograms = () => ({
  type: types.GET_PROGRAMS_REQUEST,
});

export const updateProgramsTable = () => ({
  type: types.UPDATE_PROGRAMS_TABLE_REQUEST,
});

export const clearData = () => ({
  type: types.CLEAR_DATA,
});
