/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import moment from 'moment';
import { bindActionCreators, compose } from 'redux';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale-provider/en_US';
import zhCN from 'antd/es/locale-provider/zh_CN';

import injectSaga from 'utils/injectSaga';
import withStyles from 'utils/withStyles';

import CapSpin from '@capillarytech/cap-ui-library/CapSpin';

import * as selectors from './selectors';
import * as action from './actions';
import sagas from './saga';
import * as globalSelectors from '../Cap/selectors';
import * as constants from '../App/constants';
import styles from './style';

const { COMPLETE } = constants;
const { makeSelectLanguage } = selectors;
const { makeSelectUser } = globalSelectors;

export class LanguageProvider extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const prevUser = prevProps.user;
    const user = this.props.user;
    if (!prevUser && user) {
      this.updateLocale();
    }
  }

  componentDidMount() {
    this.updateLocale();
  }

  getReversedMappedLocale = locale => {
    const map = {
      // eslint-disable-next-line prettier/prettier
      en: 'en-US',
      'zh-cn': 'zh',
      'en-US': 'en-US',
      zh: 'zh',
    };
    return map[locale];
  };

  updateLocale() {
    const user = localStorage.getItem('user');
    let locale = localStorage.getItem('jlocale') || 'en';
    if (user) {
      locale = JSON.parse(user).lang || locale;
    }
    locale = this.getReversedMappedLocale(locale);
    const isLoginPage = window.location.pathname.indexOf('/login') !== -1;
    this.props.actions.getLocizeMessage(locale, isLoginPage);
    moment.locale(locale);
  }
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { language, messages } = this.props;
    const mappedLocale = {
      en: enUS,
      'zh-cn': zhCN,
      'en-US': enUS,
      zh: zhCN,
    };
    const jLocale = localStorage.getItem('jlocale') || 'en';
    const file = mappedLocale[jLocale];
    const isLocalLoaded = language.localeLoading === COMPLETE;
    const translatedMessages = language.messages || messages;
    return (
      <ConfigProvider locale={file}>
        <IntlProvider
          locale={language.locale}
          key={language.locale}
          messages={translatedMessages}
          onError={() => {}}
        >
          <CapSpin className={this.props.className} spinning={!isLocalLoaded}>
            {isLocalLoaded ? React.Children.only(this.props.children) : <></>}
          </CapSpin>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

LanguageProvider.propTypes = {
  language: PropTypes.object,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
  actions: PropTypes.object,
  user: PropTypes.object,
  className: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLanguage(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(action, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSagas = sagas.map(saga => injectSaga(saga));

export default compose(
  ...withSagas,
  withConnect,
)(withStyles(LanguageProvider, styles));
