import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import CapLogin from '@capillarytech/cap-ui-library/CapLogin';
import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
import config from '../../../config/app';
import { publicPath } from '../../../config/path';
import * as actions from '../Cap/actions';
import messages from './messages';
import sagas from '../Cap/saga';
import { makeSelectCap } from '../Cap/selectors';
import { userIsNotAuthenticated } from '../../../utils/authWrapper';
import { PRODUCTION } from '../Cap/constants';

const API_AUTH_ENDPOINT = config.development.auth_endpoint;
const AUTH_URL = `${API_AUTH_ENDPOINT}/auth/login`;

const Login = props => {
  const { actions, intl: { formatMessage } = {}, history } = props;
  const { loginSuccess, loginFailure, logout } = actions;
  const showSpin = process.env.NODE_ENV === PRODUCTION;
  const onSuccess = response => {
    loginSuccess(response);
    history.push(publicPath);
  };
  const onFailure = err => {
    loginFailure(err);
  };

  useEffect(() => {
    if (process.env.NODE_ENV === PRODUCTION) logout();
  }, []);

  return (
    <CapSpin spinning={showSpin}>
      <FormattedMessage {...messages.login}>
        {message => (
          <Helmet
            title={message}
            meta={[
              {
                name: 'description',
                content: <FormattedMessage {...messages.loginPage} />,
              },
            ]}
          />
        )}
      </FormattedMessage>
      <CapLogin
        signInLabel={formatMessage(messages.signIn)}
        userNameLabel={formatMessage(messages.userName)}
        passwordLabel={formatMessage(messages.password)}
        apiEndPoint={AUTH_URL}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </CapSpin>
  );
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectCap(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = sagas.map((saga, index) =>
  injectSaga({ key: `cap-${index}`, saga }),
);

export default compose.apply(null, [
  withRouter,
  userIsNotAuthenticated,
  ...withSaga,
  withConnect,
])(injectIntl(Login));
