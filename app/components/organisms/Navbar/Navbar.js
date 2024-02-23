import React from 'react';
import { CapRow, CapTopBar } from '@capillarytech/cap-ui-library';
import { useHistory } from 'react-router';
import styles from './styles';
import withStyles from '../../../utils/withStyles';

const Navbar = ({ className }) => {
  const history = useHistory();

  const menuItems = {
    items: [
      {
        label: 'Capillary Library',
        link: '/book-list',
        key: 'home-page',
      },
      {
        label: 'Profile',
        link: '/profile-page',
        key: 'profile-page',
      },
      {
        label: 'New Request',
        link: '/new-book-request',
        key: 'new-book-request',
      },
    ],

    onMenuItemClick: ({ link }) => {
      history.push(`${link}`);
    },
  };
  return (
    <CapRow className={className}>
      <CapTopBar menuProps={menuItems} />
    </CapRow>
  );
};

export default withStyles(Navbar, styles);
