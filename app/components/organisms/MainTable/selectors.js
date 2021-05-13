import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

/**
 * Direct selector to the loyaltyDetail state domain
 */

const selectLoyaltyDetailDomain = (state = fromJS({})) =>
  state.get('loyaltyDetail', initialState);

/**
 * Default selector used by loyaltyDetail
 */

const makeSelectLoyaltyDetails = () =>
  createSelector(selectLoyaltyDetailDomain, (substate = fromJS({})) =>
    substate.toJS(),
  );

const makeSelectUsers = () =>
  createSelector(selectLoyaltyDetailDomain, (substate = fromJS({})) => ({
    getUsersByIdsStatus: substate.get('getUsersByIdsStatus'),
    usersList: substate.get('usersList')?.toJS(),
    usersObj:
      substate
        .get('usersList')
        ?.toJS()
        ?.reduce((acc, user) => {
          acc[user.userId] = `${user.firstName} ${user.lastName}`;
          return acc;
        }, {}) || {},
    usersDataError: substate.get('usersDataError')?.toJS(),
  }));

const makeSelectEMFStatus = () =>
  createSelector(selectLoyaltyDetailDomain, (substate = fromJS({})) => ({
    getEMFStatus: substate.get('getEMFStatus'),
    EMFStatus: substate.get('EMFStatus')?.toJS(),
    EMFStatusError: substate.get('EMFStatusError'),
  }));

const makeSelectPrograms = () =>
  createSelector(selectLoyaltyDetailDomain, (substate = fromJS({})) => ({
    getProgramsStatus: substate.get('getProgramsStatus'),
    programDetails: substate.get('programDetails')?.toJS(),
    programDetailsError: substate.get('programDetailsError'),
  }));

export {
  selectLoyaltyDetailDomain,
  makeSelectUsers,
  makeSelectLoyaltyDetails,
  makeSelectEMFStatus,
  makeSelectPrograms,
};
