import dashboardReducer from '../reducer';
import * as types from '../constants';
import * as constants from '../../App/constants';
const { REQUEST, SUCCESS, FAILURE } = constants;

const error = new Error('error');

describe('Dashboard Reducer', () => {
  it('it handles the reducer with default type', () => {
    expect(dashboardReducer(undefined, {})).toMatchSnapshot();
    expect(dashboardReducer({}, {})).toEqual({});
  });

  it('it handles the GET_PROGRAMS_REQUEST action', () => {
    const action = {
      type: types.GET_PROGRAMS_REQUEST,
    };
    expect(dashboardReducer({}, action)).toEqual({
      getProgramsStatus: REQUEST,
      programDetails: [],
    });
  });

  it('it handles the GET_PROGRAMS_SUCCESS action', () => {
    const action = {
      type: types.GET_PROGRAMS_SUCCESS,
      result: [],
    };
    expect(dashboardReducer({}, action)).toEqual({
      getProgramsStatus: SUCCESS,
      updateProgramsTableStatus: SUCCESS,
      programDetails: [],
    });
  });

  it('it handles the GET_PROGRAMS_FAILURE action', () => {
    const action = {
      type: types.GET_PROGRAMS_FAILURE,
      error,
    };
    expect(dashboardReducer({}, action)).toEqual({
      getProgramsStatus: FAILURE,
      updateProgramsTableStatus: FAILURE,
      programDetailsError: error,
    });
  });

  it('it handles the UPDATE_PROGRAMS_TABLE_REQUEST action', () => {
    const action = {
      type: types.UPDATE_PROGRAMS_TABLE_REQUEST,
    };
    expect(dashboardReducer({}, action)).toEqual({
      updateProgramsTableStatus: REQUEST,
    });
  });

  it('it handles the LAST_SYNC_TIME_REQUEST action', () => {
    const action = {
      type: types.LAST_SYNC_TIME_REQUEST,
    };
    expect(dashboardReducer({}, action)).toEqual({
      getLastSyncTimeStatus: REQUEST,
      lastSyncTime: '',
      lastSyncTimeError: '',
    });
  });

  it('it handles the LAST_SYNC_TIME_SUCCESS action', () => {
    const action = {
      type: types.LAST_SYNC_TIME_SUCCESS,
      result: '',
    };
    expect(dashboardReducer({}, action)).toEqual({
      getLastSyncTimeStatus: SUCCESS,
      lastSyncTime: '',
    });
  });

  it('it handles the LAST_SYNC_TIME_FAILURE action', () => {
    const action = {
      type: types.LAST_SYNC_TIME_FAILURE,
      error,
    };
    expect(dashboardReducer({}, action)).toEqual({
      getLastSyncTimeStatus: FAILURE,
      lastSyncTimeError: error,
    });
  });
});
