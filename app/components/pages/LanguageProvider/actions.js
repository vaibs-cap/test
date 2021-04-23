/*
 *
 * LanguageProvider actions
 *
 */

import * as types from './constants';

export function changeLocale(languageLocale) {
  return {
    type: types.CHANGE_LOCALE,
    locale: languageLocale,
  };
}

export function getLocizeMessage(locale, isSkip = false, callback) {
  if (isSkip) {
    return {
      type: types.GET_LOCIZE_MESSAGE_SKIP,
    };
  }
  return {
    type: types.GET_LOCIZE_MESSAGE_REQUEST,
    locale,
    callback,
  };
}
