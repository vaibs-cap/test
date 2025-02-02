import React from 'react';
import {
  CapButton,
  CapColumn,
  CapRow,
  CapTopBar,
} from '@capillarytech/cap-ui-library';
import styles from './styles';
import withStyles from '../../../utils/withStyles';
import { publicPath } from '../../../config/path';
import { useHistory } from 'react-router';

const Navbar = ({ className }) => {
    const history = useHistory();
    console.log('inside navbar');
    const menuItems = {
        items: [
            {
                label: 'Expense Tracker',
                link: '/home',
                key: 'expense-tracker',
            },
            {
                label: 'Add Expense',
                link: '/add-expense',
                key: 'add-expense',
            },
            {
                label: 'Show Graph',
                link: '/show-graph',
                key: 'show-graph',
            }
        ],
        onMenuItemClick: ({ link}) => {
            history.push(`${link}`);
        }
    };
    
    return (
       <CapRow className={className}>
             <CapTopBar menuProps={menuItems} />
           </CapRow>
    );
};
export default withStyles(Navbar, styles);