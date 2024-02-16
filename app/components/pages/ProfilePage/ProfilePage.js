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
  const displayBorrowTable = true;
  const displayRequestTable = false;
  const [toggleTable, setToggleTable] = useState(displayBorrowTable);
  const handleClick = e => {
    if (e.key === 'request') setToggleTable(displayRequestTable);
    else setToggleTable(displayBorrowTable);
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
      </CapMenu>
      {toggleTable ? <ProfilePageBorrowTable /> : <ProfilePageRequestTable />}
      <ProfilePageNewRequestTable />
    </div>
  );
};

ProfilePage.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

ProfilePage.defaultProps = {};

export default withStyles(injectIntl(ProfilePage), styles);
