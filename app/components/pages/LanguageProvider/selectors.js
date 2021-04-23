import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = (state = fromJS({})) =>
  state.get('language', initialState);

/**
 * Select the language locale
 */

export const makeSelectLanguage = () =>
  createSelector(selectLanguage, (substate = fromJS({})) => substate.toJS());

export { selectLanguage };
