import loyaltyDetailReducer from '../reducer';
import * as types from '../constants';
import * as constants from '../../../pages/App/constants';
const { REQUEST, SUCCESS, FAILURE } = constants;

const error = new Error('error');

describe('ConfigureKPI Reducer', () => {
  it('it handles the reducer with default type', () => {
    expect(loyaltyDetailReducer(undefined, {})).toMatchSnapshot();
    expect(loyaltyDetailReducer({}, {})).toEqual({});
  });

  it('it handles the GET_PROGRAMS_REQUEST action', () => {
    const action = {
      type: types.GET_PROGRAMS_REQUEST,
    };
    expect(loyaltyDetailReducer({}, action)).toEqual({
      getProgramsStatus: REQUEST,
      programDetails: [],
    });
  });

  it('it handles the GET_PROGRAMS_SUCCESS action', () => {
    const action = {
      type: types.GET_PROGRAMS_SUCCESS,
      result: [],
    };
    expect(loyaltyDetailReducer({}, action)).toEqual({
      getProgramsStatus: SUCCESS,
      programDetails: [],
    });
  });

  it('it handles the GET_PROGRAMS_FAILURE action', () => {
    const action = {
      type: types.GET_PROGRAMS_FAILURE,
      error,
    };
    expect(loyaltyDetailReducer({}, action)).toEqual({
      getProgramsStatus: FAILURE,
      programDetailsError: error,
    });
  });
});
