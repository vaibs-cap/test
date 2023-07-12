import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants';
import * as saga from '../saga';

const { getProductsSaga, watchForGetProducts } = saga;

const error = new Error('error');

describe('ProductDetail saga', () => {
  describe('getProducts saga', () => {
    it('handle valid response from api', () => {
      expectSaga(getProductsSaga)
        .provide([
          [
            matchers.call.fn(saga.getProducts),
            [],
          ],
        ])
        .put({
            type: types.GET_PRODUCT_SUCCESS,
            payload: [],
          })
        .run();
    });

    it('handle error response from api', () => {
      expectSaga(getProductsSaga)
        .provide([
          [
            matchers.call.fn(saga.getProducts),
            {
              error,
            },
          ],
        ])
        .put({
          type: types.GET_PRODUCTS_FAILURE,
          error,
        })
        .run();
    });

    it('handles error thrown from api', () => {
      expectSaga(getProductsSaga)
        .provide([[matchers.call.fn(saga.getProducts), throwError(error)]])
        .put({
          type: types.GET_PROGRAMS_FAILURE,
          error,
        })
        .run();
    });
  });

  describe('watchForGetPrograms saga', () => {
    const generator = watchForGetProducts();
    it('should call watchers functions', () => {
      expect(generator.next().value).toEqual(
        takeLatest(types.GET_PRODUCT_REQUEST, getProductsSaga),
      );
    });
  });
});
