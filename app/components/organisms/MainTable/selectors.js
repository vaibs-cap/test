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

const makeSelectPrograms = () =>
  createSelector(selectLoyaltyDetailDomain, (substate = fromJS({})) => ({
    getProgramsStatus: substate.get('getProgramsStatus'),
    programDetails: substate.get('programDetails')?.toJS(),
    programDetailsError: substate.get('programDetailsError'),
  }));

export {
  selectLoyaltyDetailDomain,
  makeSelectLoyaltyDetails,
  makeSelectPrograms,
};
