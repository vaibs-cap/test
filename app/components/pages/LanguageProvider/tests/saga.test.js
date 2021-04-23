import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants';
import * as Api from '../../../../services/api';
import * as saga from '../saga';

const { getLocizeMessage, watchGetLocizeMessage } = saga;

const error = new Error('error');

describe('LanguageProvider saga', () => {
  describe('getLocizeMessage saga', () => {
    const locale = 'en';
    const successResponse = {
      success: true,
      result: [],
    };
    it('handle valid response from api', () => {
      expectSaga(getLocizeMessage, { locale, callback: () => {} })
        .provide([[matchers.call.fn(Api.getLocizeMessage), successResponse]])
        .put({
          type: types.GET_LOCIZE_MESSAGE_SUCCESS,
          data: successResponse,
          locale,
        })
        .run();
    });

    it('should call callback once on valid response from api', () => {
      const callback = jest.fn(() => {});
      expectSaga(getLocizeMessage, { locale, callback })
        .provide([[matchers.call.fn(Api.getLocizeMessage), successResponse]])
        .put({
          type: types.GET_LOCIZE_MESSAGE_SUCCESS,
          data: successResponse,
          locale,
        })
        .run();
      expect(callback.mock.calls.length).toBe(1);
    });

    it('handles error thrown from api', () => {
      expectSaga(getLocizeMessage, { locale, callback: () => {} })
        .provide([[matchers.call.fn(Api.getLocizeMessage), throwError(error)]])
        .put({
          type: types.GET_LOCIZE_MESSAGE_FAILURE,
          data: error,
        })
        .run();
    });
  });

  describe('watchGetLocizeMessage saga', () => {
    const generator = watchGetLocizeMessage();
    it('should call watchers functions', () => {
      expect(generator.next().value).toEqual(
        takeLatest(types.GET_LOCIZE_MESSAGE_REQUEST, getLocizeMessage),
      );
    });
  });
});
