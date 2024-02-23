import React from 'react';
import { publicPath } from '../../../config/path';
import Signin from '../../organisms/Signin-Signup/Signin';
import { PRODUCTION } from '../Cap/constants';
const { CapSpin, CapNotification } = require('@capillarytech/cap-ui-library');

const LibSignin = props => {
  const { history } = props;
  const showSpin = process.env.NODE_ENV === PRODUCTION;

  const onSuccess = resData => {
    if (resData.data.status === 'SUCCESS') {
      history.push('/book-list');
    }
  };
  const onFailure = resData => {
    CapNotification.error(resData.data);
  };
  const onWarning = war => {
    CapNotification.warning(war);
  };

  return (
    <CapSpin spinning={showSpin}>
      <Signin
        signInLable="Sign-In"
        userEmailLable="User Email"
        userPasswordLable="Password"
        onSuccess={onSuccess}
        onFailure={onFailure}
        onWarning={onWarning}
      />
    </CapSpin>
  );
};

export default LibSignin;
