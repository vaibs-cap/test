import React from 'react';

import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import clearDataOnUnmount from 'utils/clearDataOnUnmount';
import MainTable from '../../organisms/MainTable';
import PageTemplate from '../../templates/PageTemplate';

import * as actions from './actions';
import * as globalActions from '../Cap/actions';
import saga from './saga';
import reducer from './reducer';

export const Dashboard = () => (
  <PageTemplate>
    <MainTable />
  </PageTemplate>
);

Dashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    globalActions: bindActionCreators(globalActions, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'dashboard', saga });
const withReducer = injectReducer({ key: 'dashboard', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(clearDataOnUnmount(Dashboard));
