import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

// sets newProductDetail to initialState

const selectNewProductDetailDomain = (state = fromJS({})) =>
  state.get('newProductDetail', initialState);

//get newProductDetail State

const makeSelectNewProductDetails = () =>
  createSelector(selectNewProductDetailDomain, (substate = fromJS({})) =>
    substate.toJS(),
  );

const makeSelectProductStatus = () =>
createSelector(selectNewProductDetailDomain, (substate = fromJS({})) =>
  substate.get('status'),
);
export { selectNewProductDetailDomain, makeSelectNewProductDetails ,makeSelectProductStatus};
