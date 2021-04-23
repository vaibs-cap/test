import { fromJS } from 'immutable';
import * as types from './constants';
import * as constants from '../App/constants';

const { REQUEST, SUCCESS, FAILURE } = constants;

export const initialState = fromJS({
  getProgramsStatus: '',
  updateProgramsTableStatus: '',
  programDetails: [],
  programDetailsError: null,
});

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROGRAMS_REQUEST:
      return state
        .set('getProgramsStatus', REQUEST)
        .set('programDetails', fromJS([]))
        .set('programDetailsError', null);
    case types.GET_PROGRAMS_SUCCESS:
      return state
        .set('getProgramsStatus', SUCCESS)
        .set('updateProgramsTableStatus', SUCCESS)
        .set('programDetails', fromJS(action.result));
    case types.GET_PROGRAMS_FAILURE:
      return state
        .set('getProgramsStatus', FAILURE)
        .set('updateProgramsTableStatus', FAILURE)
        .set('programDetailsError', action.error);
    case types.UPDATE_PROGRAMS_TABLE_REQUEST:
      return state
        .set('updateProgramsTableStatus', REQUEST)
        .set('programDetailsError', null);
    case types.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default dashboardReducer;
