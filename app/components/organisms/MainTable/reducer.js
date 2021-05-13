import { fromJS } from 'immutable';
import * as types from './constants';
import * as constants from '../../pages/App/constants';

const { REQUEST, SUCCESS, FAILURE } = constants;

export const initialState = fromJS({
  getEMFStatus: '',
  programDetails: [],
  usersList: [],
  EMFStatus: {},
  getProgramsStatus: '',
  getUsersByIdsStatus: '',
  usersDataError: null,
  programDetailsError: null,
  EMFStatusError: null,
});

const loyaltyDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROGRAMS_REQUEST:
      return state
        .set('getProgramsStatus', REQUEST)
        .set('programDetails', fromJS([]))
        .set('programDetailsError', null);
    case types.GET_PROGRAMS_SUCCESS:
      return state
        .set('getProgramsStatus', SUCCESS)
        .set('programDetails', fromJS(action.result));
    case types.GET_PROGRAMS_FAILURE:
      return state
        .set('getProgramsStatus', FAILURE)
        .set('programDetailsError', action.error);
    case types.GET_USER_LIST_REQUEST:
      return state
        .set('getUsersByIdsStatus', REQUEST)
        .set('usersList', fromJS([]))
        .set('usersDataError', null);
    case types.GET_USER_LIST_SUCCESS:
      return state
        .set('getUsersByIdsStatus', SUCCESS)
        .set('usersList', fromJS(action.result));
    case types.GET_USER_LIST_FAILURE:
      return state
        .set('getUsersByIdsStatus', FAILURE)
        .set('usersDataError', action.error);
    case types.GET_EMF_STATUS_REQUEST:
      return state
        .set('getEMFStatus', REQUEST)
        .set('EMFStatus', fromJS({}))
        .set('EMFStatusError', null);
    case types.GET_EMF_STATUS_SUCCESS:
      return state
        .set('getEMFStatus', SUCCESS)
        .set('EMFStatus', fromJS(action.result));
    case types.GET_EMF_STATUS_FAILURE:
      return state
        .set('getEMFStatus', FAILURE)
        .set('EMFStatusError', action.error);
    case types.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default loyaltyDetailReducer;
