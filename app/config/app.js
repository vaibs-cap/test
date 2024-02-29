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
    // api_endpoint: 'https://crm-nightly-new.cc.capillarytech.com/loyalty/api/v1',
    // api_endpoint: 'http://localhost:2050/loyalty/api/v1',
    api_endpoint: 'https://cap-api-load-tester.onrender.com',
    auth_endpoint: 'https://crm-nightly-new.cc.capillarytech.com/arya/api/v1',
    bi_api_endpoint:
      'https://crm-nightly-new.cc.capillarytech.com/arya/api/v1/bi',
    login_url: '/login',
    dashboard_url: path.publicPath,
    mock_user_id: '123', // Todo: Need to change with actual user Id
    mock_endpoint: 'https://cap-api-load-tester.onrender.com', // Can be used during development; the port can be changed according to your local server port.
  },
  testing: {
    api_endpoint: '',
    auth_endpoint: '',
    login_url: '',
  },
};

export default config;
