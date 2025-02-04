import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { CapHeading, CapRow, CapInput, CapSelect } from '@capillarytech/cap-ui-library';
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
import * as actions from './actions';
import style from './style';
import { expenseReducer } from './reducer';
import { searchByName } from './actions';
import { setSortBy } from './actions';
import withStyles from '../../../utils/withStyles';
import Graph from '../../organisms/ShowExpenseGraph/Graph';
import {
  makeExpensesSelector,
  makeErrorSelector,
  makeLoadingSelector,
  makeSortedExpensesSelector,
} from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from '../../organisms/Filter/messages';
//import { disconnect } from 'ngrok';

const ExpensetrackerHome = ({
  className,
  expenses,
  loading,
  error,
  fetchExpenseRequest,
  searchByName,
  setSortBy
}) => {
  const [enteredFilterValue, setEnteredFilterValue] = useState('');
  const [filterBy, selectedFilterBy] = useState('BY_AMOUNT');

  useEffect(
    () => {
      //console.log('Fetching expenses... Home:', expenses);
      fetchExpenseRequest();
    },
    [fetchExpenseRequest],
  );
  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );
  console.log('totalExpenses:', totalExpenses);

  const balance = 100000 - totalExpenses;

  //const filterKey = getFilterKey();

  function setFilterBy(val) {
    selectedFilterBy(val);
  }

  function onFilterValueChange(val) {
    setEnteredFilterValue(val);
    //searchByName(val);
  }

  return (
    <>
      <CapRow className={className}>
        <NavBar />
        
        <CapRow type="flex">
         <CapHeading className='total-expense' type="h1" style={{marginLeft: "32%", marginRight: "35px"}}>Total Expense: $<a style={{color:"red"}}>{totalExpenses}</a></CapHeading>
         <CapHeading className='balance' type="h1">Balance: $<a style={{color:"green"}}>{balance}</a></CapHeading>
        </CapRow>
        <CapRow>
          <Filter
            selectedFilterBy={filterBy}
            handleFilterByChange={setFilterBy}
            filterValue={enteredFilterValue}
            handleFilterValueChange={onFilterValueChange}
            sortBy={filterBy}
          />
          {/* <CapRow className="search-section" type="flex">
            <CapInput
              className="search-field"
              value={enteredFilterValue}
              disabled={filterBy === 'NO_FILTER'}
              onChange={event => {
                onFilterValueChange(event.target.value);
                searchByName(event.target.value);
              }}
              //placeholder={getPlaceHolderValue(selectedFilterBy)}
            />
            <CapSelect
              className="search-field"
              value={filterBy}
              onChange={(e) => setSortBy(e.target.value)}
              // options={[...FILTER_BY_OPTIONS]}
            />
          </CapRow> */}
          <ExpenseList expenses={expenses} />
          {/* <Graph expenses={expenses}/> */}
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
//   console.log("searchList: ", searchList);

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
  fetchExpenseRequest: () => dispatch(fetchExpenseRequest()),
  searchByName : (val) => dispatch(searchByName(val)),
  setSortBy : (sortBy) => dispatch(setSortBy(sortBy)),
  

  //searchByName : (val) => dispatch(searchByName(val)),
});

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
)(withStyles(ExpensetrackerHome, style));

// export default connect(mapStateToProps, mapDispatchToProps,)(ExpensetrackerHome);
// export default ExpensetrackerHome;
