import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants';
import * as Api from '../../../../services/api';
import * as saga from '../saga';

const { getPrograms, watchForGetPrograms } = saga;

const error = new Error('error');

describe('LoyaltyDetail saga', () => {
  describe('getPrograms saga', () => {
    it('handle valid response from api', () => {
      expectSaga(getPrograms)
        .provide([
          [
            matchers.call.fn(Api.getPrograms),
            {
              success: true,
              result: [],
            },
          ],
        ])
        .put({
          type: types.GET_PROGRAMS_SUCCESS,
          result: [],
        })
        .run();
    });

    it('handle error response from api', () => {
      expectSaga(getPrograms)
        .provide([
          [
            matchers.call.fn(Api.getPrograms),
            {
              success: false,
              error,
            },
          ],
        ])
        .put({
          type: types.GET_PROGRAMS_FAILURE,
          error,
        })
        .run();
    });

    it('handles error thrown from api', () => {
      expectSaga(getPrograms)
        .provide([[matchers.call.fn(Api.getPrograms), throwError(error)]])
        .put({
          type: types.GET_PROGRAMS_FAILURE,
          error,
        })
        .run();
    });
  });

  describe('watchForGetPrograms saga', () => {
    const generator = watchForGetPrograms();
    it('should call watchers functions', () => {
      expect(generator.next().value).toEqual(
        takeLatest(types.GET_PROGRAMS_REQUEST, getPrograms),
      );
    });
  });
});
