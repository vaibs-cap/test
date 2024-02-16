import React, { useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { CapButton, CapMenu } from '@capillarytech/cap-ui-library';
import withStyles from 'utils/withStyles';
import ProfilePageRequestTable from '../../organisms/ProfilePageRequestTable/ProfilePageRequestTable';
import ProfilePageBorrowTable from '../../organisms/ProfilePageBorrowTable/ProfilePageBorrowTable';
import ProfilePageNewRequestTable from '../../organisms/ProfilePageNewRequestTable/ProfilePageNewRequestTable';
import styles from './styles';
const ProfilePage = ({ className, intl: { formatMessage } }) => {
  const isAdmin = true;
  const [menu, setMenu] = useState(0);
  const handleClick = e => {
    if (e.key === 'borrow') setMenu(1);
    else if (e.key === 'request') setMenu(2);
    else if (e.key === 'new_request') setMenu(3);
  };
  return (
    <div className="m-20">
      <CapMenu mode="horizontal">
        <CapMenu.Item key="borrow" onClick={handleClick}>
          Borrowed Books
        </CapMenu.Item>
        <CapMenu.Item key="request" onClick={handleClick}>
          Requested Books
        </CapMenu.Item>
        {isAdmin ? (
          <CapMenu.Item key="new_request" onClick={handleClick}>
            New Requested Books
          </CapMenu.Item>
        ) : (
          <></>
        )}
      </CapMenu>
      {menu === 1 ? (
        <ProfilePageBorrowTable />
      ) : menu === 2 ? (
        <ProfilePageRequestTable />
      ) : (
        <ProfilePageNewRequestTable />
      )}
    </div>
  );
};

ProfilePage.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

ProfilePage.defaultProps = {};

export default withStyles(injectIntl(ProfilePage), styles);
