import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants';
import * as saga from '../saga';

const { setProductsSaga, watchForSetProducts } = saga;

const error = new Error('error');

describe('AddProductDetail saga', () => {
  describe('setProducts saga', () => {
    it('handle valid response from api', () => {
      expectSaga(setProductsSaga)
        .provide([
          [
            matchers.call.fn(saga.setProducts),
            [],
          ],
        ])
        .put({
            type: types.SET_PRODUCT_SUCCESS,
            payload: [],
          })
        .run();
    });

    it('handle error response from api', () => {
      expectSaga(setProductsSaga)
        .provide([
          [
            matchers.call.fn(saga.setProducts),
            {
              error,
            },
          ],
        ])
        .put({
          type: types.SET_PRODUCT_FAILURE,
          error,
        })
        .run();
    });

    it('handles error thrown from api', () => {
      expectSaga(setProductsSaga)
        .provide([[matchers.call.fn(saga.setProducts), throwError(error)]])
        .put({
          type: types.SET_PRODUCT_FAILURE,
          error,
        })
        .run();
    });
  });

  describe('watchForSetProducts saga', () => {
    const generator = watchForSetProducts();
    it('should call watchers functions', () => {
      expect(generator.next().value).toEqual(
        takeLatest(types.SET_PRODUCT_REQUEST, setProductsSaga),
      );
    });
  });
});
