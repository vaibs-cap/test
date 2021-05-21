import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

/**
 * Direct selector to the Dashboard state domain
 */

const selectDashboardDomain = (state = fromJS({})) =>
  state.get('dashboard', initialState);

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(selectDashboardDomain, (substate = fromJS({})) =>
    substate.toJS(),
  );

const makeSelectUpdateProgramsTableStatus = () =>
  createSelector(selectDashboardDomain, (substate = fromJS({})) =>
    substate.get('updateProgramsTableStatus'),
  );

export {
  selectDashboardDomain,
  makeSelectDashboard,
  makeSelectUpdateProgramsTableStatus,
};
