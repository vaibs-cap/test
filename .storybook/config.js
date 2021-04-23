import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
import { configure, addDecorator } from '@storybook/react';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';

import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import zhLocaleData from 'react-intl/locale-data/zh';

import Provider from './provider';
import styles from './styles';

import en from '../app/translations/en.json';
import zh from '../app/translations/zh.json';

const GlobalStyles = createGlobalStyle`${styles}`;

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

const messages = { en, zh };

setIntlConfig({
  locales: ['en', 'zh'],       
  defaultLocale: 'en',
  getMessages: (locale) => messages[locale],
});

addDecorator(withIntl);

addDecorator(story => {
  return <Provider story={story()} />;
});

addDecorator(story => (
  <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
    <Route path="/" component={() => story()} />
  </Router>
))

addDecorator(story => (
  <div className="loyalty">
      <GlobalStyles />
      {story()}
  </div>
));

configure([require.context('../app/components', true, /\.stories\.jsx?$/)], module);
