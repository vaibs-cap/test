import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants';
import * as Api from '../../../../services/api';
import * as saga from '../saga';

const { getLastSyncTime, watchForGetLastSyncTime } = saga;

const error = new Error('error');

describe('Dashboard saga', () => {
  describe('getLastSyncTime saga', () => {
    it('handle valid response from api', () => {
      expectSaga(getLastSyncTime)
        .provide([
          [
            matchers.call.fn(Api.getLastSyncTime),
            {
              status: {
                isError: false,
                response: '',
              },
            },
          ],
        ])
        .put({
          type: types.LAST_SYNC_TIME_SUCCESS,
          result: '',
        })
        .run();
    });

    it('handle error response from api', () => {
      expectSaga(getLastSyncTime)
        .provide([
          [
            matchers.call.fn(Api.getLastSyncTime),
            {
              status: {
                isError: true,
                message: error,
              },
            },
          ],
        ])
        .put({
          type: types.LAST_SYNC_TIME_FAILURE,
          error,
        })
        .run();
    });

    it('handles error thrown from api', () => {
      expectSaga(getLastSyncTime)
        .provide([[matchers.call.fn(Api.getLastSyncTime), throwError(error)]])
        .put({
          type: types.LAST_SYNC_TIME_FAILURE,
          error,
        })
        .run();
    });
  });

  describe('watchForGetLastSyncTime saga', () => {
    const generator = watchForGetLastSyncTime();
    it('should call watchers functions', () => {
      expect(generator.next().value).toEqual(
        takeLatest(types.LAST_SYNC_TIME_REQUEST, getLastSyncTime),
      );
    });
  });
});
