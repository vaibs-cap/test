import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { fromJS } from 'immutable';
import * as appConstants from '../App/constants';
import * as constants from './constants';

const { STANDARD } = constants;
const { SUCCESS } = appConstants;
/**
 * Direct selector to the cap state domain
 */

const selectCapDomain = (state = fromJS({})) => state.get('loyaltyCap');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Cap
 */

const makeSelectGlobal = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => substate.toJS());

const makeSelectOrg = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => ({
    fetchingUserdata: substate.get('fetchingUserdata'),
    orgID: substate.get('orgID'),
  }));

const makeSelectCap = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => {
    const user = substate.get('user')?.toJS();
    return {
      user: !isEmpty(user) && user,
      currentOrgDetails: substate.get('currentOrgDetails')?.toJS(),
    };
  });

const makeSelectUser = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) =>
    substate.get('user')?.toJS(),
  );

const makeSelectSidebarMenuData = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => {
    const sidebarMenuData = substate.get('sidebarMenuData')?.toJS();
    let parsedMenuData = [];
    if (sidebarMenuData?.status === SUCCESS && sidebarMenuData?.data) {
      parsedMenuData = sidebarMenuData.data;
    }
    return parsedMenuData;
  });

const makeSelectTopbarMenuData = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => {
    const topbarMenuData = substate.get('topbarMenuData')?.toJS();
    let parsedMenuData = [];
    if (topbarMenuData?.status === SUCCESS && topbarMenuData?.data) {
      parsedMenuData = topbarMenuData.data;
    }
    return parsedMenuData;
  });

const makeSelectLastSyncData = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => ({
    getLastSyncTimeStatus: substate.get('getLastSyncTimeStatus'),
    lastSyncTime: substate.get('lastSyncTime'),
    lastSyncTimeError: substate.get('lastSyncTimeError'),
  }));

const makeSelectUpsertId = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => {
    const orgKpiConfig = substate.get('orgKpiConfig')?.toJS();
    const tagName = orgKpiConfig?.[0]?.scope?.tag;
    return (tagName && tagName !== STANDARD && orgKpiConfig[0]?._id) || '';
  });

const makeSelectOrgKpiConfig = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => ({
    orgKpiConfig: substate.get('orgKpiConfig')?.toJS(),
    getOrgKpiConfigStatus: substate.get('getOrgKpiConfigStatus'),
    kpis: substate.get('orgKpiConfig')?.toJS()?.[0]?.kpis,
    orgKpiConfigError: substate.get('orgKpiConfigError'),
  }));

const makeSelectProgramFilterType = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => ({
    getProgramFilterTypeStatus: substate.get('getProgramFilterTypeStatus'),
    programFilterType: substate.get('programFilterType')?.toJS(),
    programFilterTypeError: substate.get('programFilterTypeError'),
  }));

const makeSelectFieldData = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => ({
    getFieldDataStatus: substate.get('getFieldDataStatus'),
    allContributors: substate.get('allContributors')?.toJS(),
    entities: substate.get('entities')?.toJS(),
    getFieldDataError: substate.get('getFieldDataError'),
  }));

const makeSelectMappedEntities = () =>
  createSelector(selectCapDomain, (substate = fromJS({})) => ({
    getMappedEntitiesStatus: substate.get('getMappedEntitiesStatus'),
    mappedEntities: substate.get('mappedEntities')?.toJS(),
    mappedEntitiesError: substate.get('mappedEntitiesError'),
  }));

export {
  selectCapDomain,
  makeSelectOrg,
  makeSelectCap,
  makeSelectUser,
  makeSelectSidebarMenuData,
  makeSelectTopbarMenuData,
  makeSelectLastSyncData,
  makeSelectUpsertId,
  makeSelectOrgKpiConfig,
  makeSelectProgramFilterType,
  makeSelectGlobal,
  makeSelectFieldData,
  makeSelectMappedEntities,
};
