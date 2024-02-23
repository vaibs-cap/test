import React from 'react';
import { CapButton, CapRow, CapTopBar } from '@capillarytech/cap-ui-library';
import { useHistory } from 'react-router';
import styles from './styles';
import withStyles from '../../../utils/withStyles';

const Navbar = ({ className }) => {
  const history = useHistory();

  const menuItems = {
    items: [
      {
        label: 'Capillary Library',
        link: '/',
        key: 'home-page',
      },
      {
        label: 'New Request',
        link: '/new-book-request',
        key: 'new-book-request',
      },
      {
        label: 'Profile',
        link: '/profile-page',
        key: 'profile-page',
      },
    ],

    onMenuItemClick: ({ link }) => {
      history.push(`${link}`);
    },
  };

  const ifUserAdmin = localStorage.getItem('userType');
  if (ifUserAdmin === 'admin') {
    menuItems.items.push({
      label: 'Admin Page',
      link: '/admin',
      key: 'admin',
    });
  }
  const handleSignout = () => {
    localStorage.clear();
    history.push('/libSignin');
  };
  return (
    <CapRow className={className}>
      <CapTopBar menuProps={menuItems} />
      <CapButton onClick={handleSignout}>Sign-out</CapButton>
    </CapRow>
  );
};

export default withStyles(Navbar, styles);
