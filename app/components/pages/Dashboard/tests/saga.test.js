import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants';
import * as Api from '../../../../services/api';
import * as saga from '../saga';

const {
  getPrograms,
  getLastSyncTime,
  watchForGetPrograms,
  watchForGetLastSyncTime,
  watchForUpdateProgramsTable,
} = saga;

const error = new Error('error');

describe('Dashboard saga', () => {
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

  describe('watchForGetPrograms saga', () => {
    const generator = watchForGetPrograms();
    it('should call watchers functions', () => {
      expect(generator.next().value).toEqual(
        takeLatest(types.GET_PROGRAMS_REQUEST, getPrograms),
      );
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

  describe('watchForUpdateProgramsTable saga', () => {
    const generator = watchForUpdateProgramsTable();
    it('should call watchers functions', () => {
      expect(generator.next().value).toEqual(
        takeLatest(types.UPDATE_PROGRAMS_TABLE_REQUEST, getPrograms),
      );
    });
  });
});
