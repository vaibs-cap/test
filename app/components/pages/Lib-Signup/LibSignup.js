import React from 'react';
import { CapNotification, CapSpin } from '@capillarytech/cap-ui-library';

import { PRODUCTION } from '../Cap/constants';
import { publicPath } from '../../../config/path';

import Signup from '../../organisms/Signin-Signup/Signup';

const LibSignup = props => {
  const { history } = props;
  // const { libSingupSuccess, libSignupFailure } = actions;
  const showSpin = process.env.NODE_ENV === PRODUCTION;
  const onSuccess = response => {
    if (response.data.success === true) {
      history.push('/libSignin');
    }
  };
  const onFailure = err => {
    CapNotification.error(err);
  };
  const onWarning = war => {
    CapNotification.warning(war);
  };

  return (
    <CapSpin spinning={showSpin}>
      <Signup
        signUpLable="Sign-Up"
        userNameLable="User Name"
        userEmailLable="User Email"
        userPasswordLable="Password"
        onSuccess={onSuccess}
        onFailure={onFailure}
        onWarning={onWarning}
      />
    </CapSpin>
  );
};

export default LibSignup;
