/*
 *
 * LanguageProvider reducer
 *
 */
import { fromJS } from 'immutable';
import * as types from './constants';
import { DEFAULT_LOCALE } from '../../../i18n';
import * as constants from '../App/constants';

const { REQUEST, COMPLETE } = constants;

export const initialState = fromJS({
  locale: DEFAULT_LOCALE,
  localeLoading: '',
  messages: {},
});

const languageProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_LOCALE:
      return state.set('locale', action.locale);
    case types.GET_LOCIZE_MESSAGE_REQUEST:
      return state.set('localeLoading', REQUEST);
    case types.GET_LOCIZE_MESSAGE_SUCCESS:
      return state
        .set('localeLoading', COMPLETE)
        .set('messages', fromJS(action.data))
        .set('locale', action.locale);
    case types.GET_LOCIZE_MESSAGE_FAILURE:
      return state.set('localeLoading', COMPLETE);
    case types.GET_LOCIZE_MESSAGE_SKIP:
      return state.set('localeLoading', COMPLETE);
    default:
      return state;
  }
};

export default languageProviderReducer;
