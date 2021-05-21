import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import sample from 'lodash/sample';

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
import * as selectors from './selectors';
import saga from './saga';
import reducer from './reducer';
import * as appConstants from '../App/constants';
import * as constants from './constants';

const { makeSelectDashboard } = selectors;

const { REQUEST, SUCCESS } = appConstants;
const { AVATAR_ICON_COLORS } = constants;

export const Dashboard = ({
  actions,
  globalActions,
  dashboardDatas: { getProgramsStatus, programDetails = [] } = {},
}) => {
  useEffect(() => {
    actions.getPrograms();
    return () => {
      globalActions.clearOrgKpiConfigData();
    };
  }, []);

  const getProgramDetails = useMemo(
    () =>
      programDetails.map(programData => ({
        ...programData,
        avatarColor: sample(AVATAR_ICON_COLORS),
        // need to replace once kpi api is done
      })),
    [programDetails],
  );
  const isLoading = !getProgramsStatus || getProgramsStatus === REQUEST;

  return (
    <PageTemplate>
      <MainTable isLoading={isLoading} programDetails={getProgramDetails} />
    </PageTemplate>
  );
};

Dashboard.propTypes = {
  actions: PropTypes.object.isRequired,
  globalActions: PropTypes.object.isRequired,
  dashboardDatas: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardDatas: makeSelectDashboard(),
});

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
