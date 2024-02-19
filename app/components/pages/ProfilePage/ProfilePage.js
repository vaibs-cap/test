import React, { useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { CapRow, CapTab } from '@capillarytech/cap-ui-library';
import withStyles from '../../../utils/withStyles';
import ProfilePageRequestTable from '../../organisms/ProfilePageRequestTable/ProfilePageRequestTable';
import ProfilePageBorrowTable from '../../organisms/ProfilePageBorrowTable/ProfilePageBorrowTable';
import ProfilePageNewRequestTable from '../../organisms/ProfilePageNewRequestTable/ProfilePageNewRequestTable';
import ProfilePageHeader from '../../organisms/ProfilePageHeader/ProfilePageHeader';
import styles from './styles';
const ProfilePage = ({ className, intl: { formatMessage } }) => {
  const isAdmin = true;
  const panes =  [{key : 'borrow', tab: 'Borrowed Books', content: <ProfilePageBorrowTable />}, 
  {key:'request', tab:'Requested Books', content:  <ProfilePageRequestTable />}];
  isAdmin ? panes.push({key: 'new_request', tab:'New Requested Books', content:  <ProfilePageNewRequestTable />}) : {};

  return (
    <CapRow className={className}>
      <ProfilePageHeader />
      <CapRow className="p-20">
      <CapTab mode="horizontal" 
          panes={panes}>
      </CapTab>
      </CapRow>
    </CapRow>
  );
};

ProfilePage.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

ProfilePage.defaultProps = {};

export default withStyles(injectIntl(ProfilePage), styles);
