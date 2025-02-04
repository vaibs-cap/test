import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { CapHeading, CapRow } from '@capillarytech/cap-ui-library';
import Filter from '../../organisms/Filter/Filter';
import ExpenseList from '../../organisms/ExpenseList/ExpenseList';
import injectSaga from '@capillarytech/cap-coupons/utils/injectSaga';
import injectReducer from '@capillarytech/cap-coupons/utils/injectReducer';
import { fetchExpenseRequest } from './actions';
import saga from './saga';
import reducer from './reducer';
import NavBar from '../../organisms/NavBar1/NavBar';
import { useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withStyles from '../../../utils/withStyles';
import * as actions from './actions';
import { expenseReducer } from './reducer';
import { searchByName } from './actions';
import {
    makeExpensesSelector,
    makeErrorSelector,
    makeLoadingSelector
} from './selectors';
//import { disconnect } from 'ngrok';

const ExpensetrackerHome = ({className, expenses, loading, error, fetchExpenseRequest, searchByName}) => {
    const [enteredFilterValue, setEnteredFilterValue] = useState('');
    const [filterBy, selectedFilterBy] = useState('BY_NAME');
    
    useEffect(() => {
        console.log('inside useEffect');
        fetchExpenseRequest();
    }, []);
    const totalExpenses = expenses.reduce((total, expense) => total + Number(expense.amount), 0);
    console.log('totalExpenses:', totalExpenses);

    const balance = 100000 - totalExpenses;
   
    function getFilterKey() {
      switch (filterBy) {
        case 'BY_ID':
          return 'id';
        case 'BY_NAME':
          return 'name';
        case 'BY_CATEGORY':
          return 'category';
        default:
          return '';      
        }
    }
    const filterKey = getFilterKey();

    function setFilterBy(val) {
      selectedFilterBy(val);
    }

    function onFilterValueChange(val) {         
      setEnteredFilterValue(val);
      searchByName(val);
      
    }

    return (
        <>
        <CapRow>
            <NavBar />
            <CapHeading type="h1">Total Expense: ${totalExpenses}</CapHeading>
            <CapHeading type="h1">Balance: ${balance}</CapHeading>
            <CapRow>
                <Filter
                  selectedFilterBy={filterBy}
                  handleFilterByChange={setFilterBy}
                  filterValue={enteredFilterValue}
                  handleFilterValueChange={onFilterValueChange}
                 />
                <ExpenseList className={className} expenses={expenses}/>
            </CapRow> 
        </CapRow>
       
        </>
    );
};



const mapStateToProps = state => 
    createStructuredSelector({
      expenses: makeExpensesSelector(state),
      loading: makeLoadingSelector(state),
    error: makeErrorSelector(state),
});
// const mapStateToProps = (state) => {
//   const searchList = state.expenseReducer?.searchList || []; // ✅ Prevent undefined error
//   const expenses = searchList.length > 0 ? searchList : state.expenseReducer?.expenses || [];

//   return {
//       expenses,
//       loading: state.expenseReducer?.loading || false,
//       error: state.expenseReducer?.error || null,
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(actions, dispatch),
// });
const mapDispatchToProps = dispatch => ({
  fetchExpenseRequest : () => dispatch(fetchExpenseRequest()),
  //searchByName : (val) => dispatch(searchByName(val)),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'expenses', saga });
const withReducer = injectReducer({
  key: 'expenses',
  reducer: expenseReducer,
});



export default compose(
  withSaga,
  withReducer,
  withConnect,
)(ExpensetrackerHome);

// export default connect(mapStateToProps, mapDispatchToProps,)(ExpensetrackerHome);
// export default ExpensetrackerHome;