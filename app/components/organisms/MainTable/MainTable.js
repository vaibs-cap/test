/**
 * LoyaltyDetail
 */
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'utils/withStyles';
import { injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapTable from '@capillarytech/cap-ui-library/CapTable';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';

import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as capUtils from '@capillarytech/cap-ui-utils';
import clearDataOnUnmount from 'utils/clearDataOnUnmount';
import RowHeader from '../../molecules/RowHeader';
import ProgramTitle from '../../molecules/Title';
import ProgramValueSkeleton from '../../molecules/ValueSkeleton';
import ProgramName from '../../molecules/Name';
import TitleWithStatus from '../../molecules/TitleWithStatus';

import CustomSkeleton from '../../atoms/CustomSkeleton';
import styles from './style';
import messages from './messages';
import globalMessages from '../../pages/Cap/messages';
import * as constants from './constants';
import * as appConstants from '../../pages/App/constants';
import * as globalConstants from '../../pages/Cap/constants';

import * as actions from './actions';
import * as selectors from './selectors';
import * as dashboardSelectors from '../../pages/Dashboard/selectors';
import * as utils from './utils';
import saga from './saga';
import reducer from './reducer';
import { publicPath } from '../../../config/path';
import * as globalSelectors from '../../pages/Cap/selectors';

const { makeSelectLastSyncData } = globalSelectors;
const { dateHelper: { msToDateFormat } = {} } = capUtils;

const { REQUEST, SUCCESS, MODE_VIEW } = appConstants;
const { PROGRAM_PERFIX_PATH, DESCEND } = globalConstants;

const { makeSelectPrograms } = selectors;
const {
  makeSelectUpdateProgramsTableStatus,
  makeSelectDashboard,
} = dashboardSelectors;
const {
  getTableColumns,
  formatColumns,
  getStatus,
  getUserIds,
  getTagProps,
  getSkeletonProps,
  getAvatarProps,
} = utils;

const {
  HYPHEN,
  EMF_ACTIVE,
  COLUMN_NAME,
  COLUMN_TIRES,
  COLUMN_USER_WITH_TIME,
} = constants;

const { CAP_SPACE_32 } = styledVars;
const tableSkeletonAvatar = CAP_SPACE_32;
const tableHeaderSkeletonHeight = CAP_SPACE_32;

export const MainTable = ({
  history,
  className,
  actions,
  isLoading,
  usersData: { getUsersByIdsStatus, usersObj = {} } = {},
  lastSyncData: { getLastSyncTimeStatus, lastSyncTime, lastSyncTimeError } = {},
  programData: { getProgramsStatus, programDetails = [] } = {},
  intl: { formatMessage },
}) => {
  console.log('PRGRAM data: ', programDetails);
  const [showSlideBox, setShowSlideBox] = useState(false);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 10,
  });

  const [sorter, setSorter] = useState({
    order: DESCEND,
    field: 'addedBy',
  });
  const isTableFieldLoading = getProgramsStatus === REQUEST;
  const isTableLoading =
    getLastSyncTimeStatus === REQUEST || isTableFieldLoading;

  const columns = useMemo(() => getTableColumns({ formatMessage }), []);

  useEffect(() => {
    actions.getPrograms();
  }, []);

  const getColumnTitle = (
    title,
    description,
    columnType,
    sortColumnName,
    dataKey,
  ) => {
    const sortOrder = sorter.field === dataKey && sorter.order;
    const { header } = getSkeletonProps();
    return (
      <ProgramTitle
        isLoading={isTableFieldLoading}
        className={classnames('loyalty-detail-table-header-row', {
          'loyalty-detail-table-header-name': columnType === COLUMN_NAME,
        })}
        title={title}
        description={description}
        showTitleSort={sortColumnName && sortColumnName === 'name'}
        showDescSort={sortColumnName && sortColumnName !== 'name'}
        sortOrder={sortOrder}
        skeletonHeight={tableHeaderSkeletonHeight}
        skeletonWidth={header}
      />
    );
  };

  const getSkeleton = columnType => {
    const { height, title, description } = getSkeletonProps();
    return (
      <ProgramValueSkeleton
        className="loyalty-detail-table-row"
        titleWidth={title}
        titleHeight={height}
        descWidth={description}
        showDescription={
          columnType === COLUMN_NAME ||
          columnType === COLUMN_TIRES ||
          columnType === COLUMN_USER_WITH_TIME
        }
        descHeight={height}
        showAvatar={columnType === COLUMN_NAME}
        avatarWidth={tableSkeletonAvatar}
        avatarHeight={tableSkeletonAvatar}
        avatarClassName="loyalty-detail-avatar"
        avatarBorderRadius="10px"
      />
    );
  };

  const getColumnByType = (columnType, ...params) => {
    if (isTableFieldLoading) {
      return getSkeleton(columnType);
    }

    switch (columnType) {
      case COLUMN_NAME:
        return getProgramName(...params);
      case COLUMN_TIRES:
        return getTires(...params);
      case COLUMN_USER_WITH_TIME:
        return getUserWithTime(...params);
    }
  };

  const getProgramName = (programDetail, dataKey, dataValue) => {
    const name = programDetail[dataKey];
    const description =
      (programDetail.isDefault && formatMessage(messages.defaultProgram)) ||
      programDetail[dataValue];
    const avatarProps = getAvatarProps(programDetail, dataKey);
    return (
      <ProgramName
        name={name}
        tagProps={getTagProps(formatMessage)}
        avatarProps={avatarProps}
        description={description}
        showTag={programDetail.tagValue}
        showIcon={programDetail.isDefault}
        className="loyalty-detail-table-row"
        tooltip={
          programDetail.isDefault &&
          formatMessage(messages.defaultProgramInductiveText)
        }
      />
    );
  };

  const getTires = (programDetail, dataKey, dataValue) => {
    const tier = `${programDetail[dataKey]} ${formatMessage(
      globalMessages.tiers,
    ).toLowerCase()}`;
    return (
      <TitleWithStatus
        className="loyalty-detail-table-row"
        title={tier}
        statusType={getStatus(programDetail, dataValue)}
        showStatus
      />
    );
  };

  const getUserWithTime = (programDetail, dataKey, dataValue) => {
    const userId = programDetail[dataKey];
    const userName = usersObj[userId] || HYPHEN;
    return (
      <TitleWithStatus
        className="loyalty-detail-table-row"
        title={userName}
        type="label2"
        description={dataValue && msToDateFormat(programDetail[dataValue])}
      />
    );
  };

  const handleTableChange = (pagination, filters, sorter) => setSorter(sorter);

  const tableProps = {
    columns: formatColumns(
      columns,
      getColumnTitle,
      getColumnByType,
      isTableFieldLoading,
    ),
    dataSource: programDetails,
    onRow: record => ({
      onClick: () =>
        history.push(
          `${publicPath}${PROGRAM_PERFIX_PATH}${record.id}/${MODE_VIEW}`,
        ),
    }),
    rowClassName: 'pointer-cursor view-message',
    scroll: {
      y: 308,
    },
    locale: {
      emptyText: formatMessage(globalMessages.noMessages),
    },
    pagination: true,
    rowKey: 'id',
    offset_limit: pagination,
    setPagination: setPagination,
    infinteScroll: true,
    id: 'messageListTable',
    showLoader: false,
    onChange: handleTableChange,
  };

  const onCreateProgramClick = () => setShowSlideBox(true);
  const showCreateButton = true;

  const tableRowHeaderProps = {
    className: 'detail-head-row-container',
    title: formatMessage(globalMessages.programs),
    buttonText: `${formatMessage(globalMessages.create)} ${formatMessage(
      globalMessages.program,
    )}`,
    lastSyncTime,
    lastSyncTimeError,
    onButtonClick: onCreateProgramClick,
    showButton: showCreateButton,
    isButtonLoading: isLoading,
  };

  return (
    <CapRow className={className}>
      <RowHeader showSync {...tableRowHeaderProps} />
      {isTableLoading ? (
        <CustomSkeleton isTitle height="384px" />
      ) : (
        <CapTable {...tableProps} />
      )}
    </CapRow>
  );
};

MainTable.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object,
  publicPath: PropTypes.string,
  className: PropTypes.string,
  lastSyncData: PropTypes.object,
  programDetails: PropTypes.array,
  programData: PropTypes.object,
  isLoading: PropTypes.bool,
  updateProgramsTableStatus: PropTypes.string,
  actions: PropTypes.object.isRequired,
  usersData: PropTypes.object,
  dashboardDatas: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  lastSyncData: makeSelectLastSyncData(),
  updateProgramsTableStatus: makeSelectUpdateProgramsTableStatus(),
  programData: makeSelectPrograms(),
  dashboardDatas: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'loyaltyDetail', saga });
const withReducer = injectReducer({ key: 'loyaltyDetail', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withRouter(injectIntl(clearDataOnUnmount(withStyles(MainTable, styles)))));
