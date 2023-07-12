import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

// sets productDetail to initialState

const selectProductDetailDomain = (state = fromJS({})) =>
  state.get('productDetail', initialState);

//get productDetail State

const makeSelectProductDetails = () =>
  createSelector(selectProductDetailDomain, (substate = fromJS({})) =>
    substate.toJS(),
  );

export { selectProductDetailDomain, makeSelectProductDetails };
