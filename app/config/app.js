import path from './path';

const config = {
  production: {
    api_endpoint: '/loyalty/api/v1',
    auth_endpoint: '/arya/api/v1',
    login_url: '/auth/login',
    bi_api_endpoint: '/arya/api/v1/bi',
    dashboard_url: path.publicPath,
    logout_url: '/auth/logout',
  },
  development: {
    api_endpoint: 'https://crm-nightly-new.cc.capillarytech.com/loyalty/api/v1',
    // api_endpoint: 'http://localhost:2050/loyalty/api/v1',
    auth_endpoint: 'https://crm-nightly-new.cc.capillarytech.com/arya/api/v1',
    bi_api_endpoint:
      'https://crm-nightly-new.cc.capillarytech.com/arya/api/v1/bi',
    login_url: '/login',
    dashboard_url: path.publicPath,
    mock_endpoint: 'http://localhost:4000', // Can be used during development; the port can be changed according to your local server port.
  },
  testing: {
    api_endpoint: '',
    auth_endpoint: '',
    login_url: '',
  },
};

export default config;
