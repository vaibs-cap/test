import { fromJS } from 'immutable';
import * as types from './constants';
import * as constants from '../App/constants';

const { REQUEST, SUCCESS, FAILURE } = constants;

export const initialState = fromJS({
  updateProgramsTableStatus: '',
  programDetails: [],
  programDetailsError: null,
});

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default dashboardReducer;
