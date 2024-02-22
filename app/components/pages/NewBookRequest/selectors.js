import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

/**
 * Direct selector to the newBookRequests state domain
 */

const selectNewBookRequestsDetailDomain = (state = fromJS({})) =>
  state.get('newBookRequests', fromJS({}));

/**
 * Default selector used by loyaltyDetail
 */

const makeSelectnewBookRequestsDetail = () =>
  createSelector(selectNewBookRequestsDetailDomain, (substate = fromJS({})) =>
    substate.toJS(),
  );

const makeSelectNewBookRequestsData = () =>
  createSelector(
    selectNewBookRequestsDetailDomain,
    (substate = fromJS({})) => ({
      getBookRequests: substate.get('bookRequests').toJS(),
      getLoading: substate.get('loading'),
      getError: substate.get('error'),
      getTotalCount: substate.get('totalCount'),
    }),
  );

export {
  makeSelectnewBookRequestsDetail,
  selectNewBookRequestsDetailDomain,
  makeSelectNewBookRequestsData,
};
