import * as types from './constants';

export const authenticate = user => ({
  type: types.LOGIN_REQUEST,
  user,
});

export const logout = () => ({
  type: types.LOGOUT_REQUEST,
});

export const loginSuccess = res => ({
  type: types.LOGIN_SUCCESS,
  res,
});

export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  error,
});

export const getSidebarMenuData = () => ({
  type: types.GET_SIDEBAR_MENU_DATA_REQUEST,
});

export const getSidebarMenuDataSuccess = data => ({
  type: types.GET_SIDEBAR_MENU_DATA_SUCCESS,
  data,
});

export const getSidebarMenuDataFailure = error => ({
  type: types.GET_SIDEBAR_MENU_DATA_FAILURE,
  error,
});

export const clearSidebarMenuData = () => ({
  type: types.CLEAR_SIDEBAR_MENU_DATA,
});

export const getTopbarMenuData = () => ({
  type: types.GET_TOPBAR_MENU_DATA_REQUEST,
});

export const getTopbarMenuDataSuccess = data => ({
  type: types.GET_TOPBAR_MENU_DATA_SUCCESS,
  data,
});

export const getTopbarMenuDataFailure = error => ({
  type: types.GET_TOPBAR_MENU_DATA_FAILURE,
  error,
});

export const clearTopbarMenuData = () => ({
  type: types.CLEAR_TOPBAR_MENU_DATA,
});

export const changeOrg = (orgID, successCallback) => ({
  type: types.SWITCH_ORG_REQUEST,
  orgID,
  successCallback,
});

export const getLastSyncTime = () => ({
  type: types.LAST_SYNC_TIME_REQUEST,
});

export const getOrgKpiConfig = programId => ({
  type: types.GET_ORG_KPI_CONFIG_REQUEST,
  programId,
});

export const setOrgKpiConfig = orgKpiConfig => ({
  type: types.GET_ORG_KPI_CONFIG_SUCCESS,
  result: [orgKpiConfig],
});

export const getUserData = () => ({
  type: types.GET_USER_DATA_REQUEST,
});

export const clearOrgKpiConfigData = () => ({
  type: types.CLEAR_ORG_KPI_CONFIG_DATA,
});

export const getProgramFilterType = callback => ({
  type: types.GET_PROGRAM_FILTER_TYPE_REQUEST,
  callback,
});

export const getProgramFieldData = (filterType, programId) => ({
  type: types.GET_FIELD_DATA_REQUEST,
  filterType,
  programId,
});

export const clearFieldData = () => ({
  type: types.CLEAR_FIELD_DATA,
});

export const getMappedEntities = filterType => ({
  type: types.GET_MAPPED_ENTITIES_REQUEST,
  filterType,
});

export const clearMappedEntities = filterType => ({
  type: types.CLEAR_MAPPED_ENTITIES,
});
