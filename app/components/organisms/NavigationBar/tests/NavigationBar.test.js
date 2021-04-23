import React from 'react';
import { mount, shallow } from 'enzyme';
import CapNavigation from '@capillarytech/cap-ui-library/CapNavigation';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBar } from '../NavigationBar';
import * as localStorageApi from '../../../../services/localStorageApi';
import * as mockdata from './mockdata';

const { naviData } = mockdata;
jest.mock('../../../../services/localStorageApi');

jest.mock('react', () => {
  const React = jest.requireActual('react');
  return {
    ...React,
    Suspense: ({ children }) => <>{children}</>,
    lazy: factory => factory(),
  };
});

const setup = props => (
  <Router>
    <NavigationBar
      history={[]}
      sidebarMenuData={[{}]}
      intl={{ formatMessage: () => {} }}
      {...props}
    />
  </Router>
);

describe('<NavigationBar />', () => {
  it('should render the Navigation Bar', async () => {
    const renderedComponent = shallow(setup());
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the Navigation Bar without secondary top bar', async () => {
    const renderedComponent = mount(
      setup({
        showSecondaryTopBar: false,
        ...naviData,
      }),
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });

  it('Push history while sidebar menu item clicks', async () => {
    const history = [];
    const renderedComponent = mount(
      setup({
        history,
        ...naviData,
      }),
    );
    renderedComponent
      .find(CapNavigation)
      .props()
      .sidebarMenuItemClick({ link: '', key: '' });

    expect(history.length).toBeGreaterThan(0);
  });

  it('Should call callback on org entity change with current org differ from pervious org', async () => {
    localStorageApi.loadItem = jest.fn().mockImplementation(() => 'orgIdTemp');

    const callback = jest.fn(() => {});
    const renderedComponent = mount(
      setup({
        changeOrg: callback,
        ...naviData,
      }),
    );

    renderedComponent
      .find(CapNavigation)
      .props()
      .changeOrgEntity('orgId');

    expect(callback.mock.calls.length).toBe(1);
  });

  it('Should not call callback on org entity change with current org same as pervious org', async () => {
    localStorageApi.loadItem = jest.fn().mockImplementation(() => 'orgId');

    const callback = jest.fn(() => {});
    const renderedComponent = mount(
      setup({
        changeOrg: callback,
        ...naviData,
      }),
    );

    renderedComponent
      .find(CapNavigation)
      .props()
      .changeOrgEntity('orgId');

    expect(callback.mock.calls.length).toBe(0);
  });

  it('Should call window.open on click setting in dropdown', async () => {
    const spy = jest.spyOn(window, 'open');
    const renderedComponent = mount(
      setup({
        orgSettingsUrl: '/',
        ...naviData,
      }),
    );
    renderedComponent
      .find(CapNavigation)
      .props()
      .dropdownMenuProps[0].onClickHandler();
    expect(spy).toBeCalled();
  });

  it('Should call callback once on click logout in dropdown', async () => {
    const callback = jest.fn(() => {});
    const renderedComponent = mount(
      setup({
        logout: callback,
        ...naviData,
      }),
    );
    renderedComponent
      .find(CapNavigation)
      .props()
      .dropdownMenuProps[1].onClickHandler();
    expect(callback.mock.calls.length).toBe(1);
  });

  it('Push history while notification icon click', async () => {
    const history = [];
    const renderedComponent = mount(
      setup({
        history,
        notificationUrl: '/',
        ...naviData,
      }),
    );
    renderedComponent
      .find(CapNavigation)
      .props()
      .topbarIcons[0].onClickHandler();
    expect(history.length).toBe(1);
  });

  it('Should call window.open on help icon click', async () => {
    const spy = jest.spyOn(window, 'open');
    const renderedComponent = mount(
      setup({
        helpUrl: '/',
        ...naviData,
      }),
    );
    renderedComponent
      .find(CapNavigation)
      .props()
      .topbarIcons[1].onClickHandler();
    expect(spy).toBeCalled();
  });

  it('Push history while settings icon click', async () => {
    const history = [];
    const renderedComponent = mount(
      setup({
        history,
        settingsUrl: '/',
        ...naviData,
      }),
    );
    renderedComponent
      .find(CapNavigation)
      .props()
      .topbarIcons[2].onClickHandler();
    expect(history.length).toBe(1);
  });

  it('Should not push history while notification icon click with null notificationUrl', async () => {
    const history = [];
    const renderedComponent = mount(
      setup({
        history,
        ...naviData,
      }),
    );
    renderedComponent
      .find(CapNavigation)
      .props()
      .topbarIcons[0].onClickHandler();
    expect(history.length).toBe(0);
  });

  it('Should not push history while settings icon click wiht null settingsUrl', async () => {
    const history = [];
    const renderedComponent = mount(
      setup({
        history,
        ...naviData,
      }),
    );
    renderedComponent
      .find(CapNavigation)
      .props()
      .topbarIcons[2].onClickHandler();
    expect(history.length).toBe(0);
  });
});
