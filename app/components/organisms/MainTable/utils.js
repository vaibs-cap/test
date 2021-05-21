import * as capUtils from '@capillarytech/cap-ui-utils';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';
import * as constants from './constants';
import * as globalConstants from '../../pages/Cap/constants';

import messages from './messages';
import globalMessages from '../../pages/Cap/messages';

const { dateHelper: { msToDateFormat } = {} } = capUtils;
const { DESCEND, ASCEND } = globalConstants;

const { FONT_COLOR_06, CAP_PURPLE01 } = styledVars;

const tableContentSkeletonHeight = '22px';
const tableContentSkeletonWidth = {
  DEFAULT: {
    header: '100%',
    title: '100%',
    description: '60%',
  },
};

const LIVE = 'live';
const ENDED = 'ended';

const {
  COLUMN_NAME,
  COLUMN_TIRES,
  COLUMN_USER_WITH_TIME,
  COLUMN_CONCEPTS_MAPPED,

  SORT_STR,
  SORT_DATE,
  SORT_STATUS,
} = constants;

export const getTableColumns = ({ formatMessage }) => {
  const columns = [
    {
      title: formatMessage(globalMessages.program),
      description: formatMessage(globalMessages.description),
      width: '19%',
      dataKey: 'name',
      dataValue: 'description',
      columnType: COLUMN_NAME,
      sortColumnName: 'name',
      sortColumnType: SORT_STR,
    },
    {
      title: formatMessage(globalMessages.tiers),
      description: formatMessage(globalMessages.status),
      width: '10%',
      dataKey: 'slabsCount',
      dataValue: 'isActive',
      columnType: COLUMN_TIRES,
      sortColumnName: 'isActive',
      sortColumnType: SORT_STATUS,
    },
  ];

  const addedUserColumn = {
    title: formatMessage(messages.updatedBy),
    description: formatMessage(messages.date),
    width: '11%',
    dataKey: 'addedBy',
    dataValue: 'addedOn',
    sortColumnName: 'addedOn',
    sortColumnType: SORT_DATE,
    columnType: COLUMN_USER_WITH_TIME,
  };

  columns.push(addedUserColumn);

  return columns;
};

const sorterHandler = (sortColumnType, sortColumnName, first, next) => {
  switch (sortColumnType) {
    case SORT_STR:
      return first[sortColumnName].localeCompare(next[sortColumnName]);
    case SORT_DATE: {
      const firstDate =
        first[sortColumnName] || msToDateFormat(first[sortColumnName]);
      const nextDate =
        next[sortColumnName] || msToDateFormat(next[sortColumnName]);
      return new Date(firstDate) - new Date(nextDate);
    }
    case SORT_STATUS: {
      return getStatus(first, sortColumnName).localeCompare(
        getStatus(next, sortColumnName),
      );
    }
    default:
      return first[sortColumnName] - next[sortColumnName];
  }
};

export const getStatus = (columnObj, columnName) =>
  columnObj[columnName] ? LIVE : ENDED;

export const getUserIds = programDetails =>
  Object.keys(
    programDetails.reduce((acc, item) => {
      const userId = item.addedBy;
      userId && (acc[userId] = '');
      return acc;
    }, {}),
  );

export const getSkeletonProps = () => {
  const { header, title, description } = tableContentSkeletonWidth.DEFAULT;
  return { height: tableContentSkeletonHeight, header, title, description };
};

export const getAvatarProps = (programDetail, dataKey) => {
  const programName = programDetail?.[dataKey]?.trim() || '';
  const secondInitialIndex = programName.indexOf(' ') + 1;
  const initals = `${programName?.[0] || ''}${
    secondInitialIndex > 0 ? programName[secondInitialIndex] : ''
  }`;
  const { text, background } = programDetail?.avatarColor || {};
  return {
    text: initals && initals.toUpperCase(),
    backgroundColor: background,
    textColor: text,
  };
};

export const getTagProps = formatMessage => ({
  font: FONT_COLOR_06,
  background: CAP_PURPLE01,
  tagText: formatMessage(messages.issueWithRules),
  title: formatMessage(messages.issueWithRules),
});

const getColumnProps = (
  {
    title,
    description,
    width,
    dataKey,
    dataValue,
    columnType,
    sortColumnType,
    sortColumnName,
  },
  index,
  getColumnTitle,
  getColumnByType,
  isLoading,
) => ({
  title: getColumnTitle(
    title,
    description,
    columnType,
    sortColumnName,
    dataKey,
  ),
  dataIndex: dataKey,
  key: dataKey + index,
  width: width,
  render: (text, programDetail) =>
    getColumnByType(columnType, programDetail, dataKey, dataValue),
  ...(!isLoading && sortColumnName
    ? {
        sortDirections: [DESCEND, ASCEND],
        sorter: (first, next) =>
          sorterHandler(sortColumnType, sortColumnName, first, next),
      }
    : {}),
});

export const formatColumns = (
  modifiedColumn,
  getColumnTitle,
  getColumnByType,
  isLoading,
) =>
  modifiedColumn.map((columnData, index) =>
    getColumnProps(
      columnData,
      index,
      getColumnTitle,
      getColumnByType,
      isLoading,
    ),
  );
