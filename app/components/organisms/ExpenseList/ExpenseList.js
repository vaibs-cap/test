import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CapHeading, CapButton, CapTable } from '@capillarytech/cap-ui-library';
import { Table } from 'antd';
import { bindActionCreators } from 'redux';
import * as actions from '../../pages/ExpenseTrackerHome/actions';
import { createStructuredSelector } from 'reselect';
import injectSaga from '@capillarytech/cap-coupons/utils/injectSaga';
import injectReducer from '@capillarytech/cap-coupons/utils/injectReducer';
import saga from '../../pages/ExpenseTrackerHome/saga';
import { expenseReducer } from '../../pages/ExpenseTrackerHome/reducer';
import { deleteExpenseRequest } from '../../pages/ExpenseTrackerHome/actions';
import { makeExpensesSelector, makeLoadingSelector, makeErrorSelector } from '../../pages/ExpenseTrackerHome/selectors';
import { useEffect } from 'react';

const ExpenseList = ({ className, expenses, loading, error, deleteExpenseRequest}) => {
    const [localExpenses, setLocalExpenses] = useState([]);
 
    useEffect(() => {
        setLocalExpenses(expenses);
    },[expenses]);
    const handleRemove = key => {
        console.log('key:', key);
        deleteExpenseRequest(key);
        setLocalExpenses(localExpenses.filter(expense => expense.id !== key));
    };
    const columns = [
        {
            title: <CapHeading type="h4">Expense Name</CapHeading>,
            dataIndex: 'expenseName',
            key: 'expenseName',
        },
        {
            title: <CapHeading type="h4">Amount</CapHeading>,
            dataIndex: 'expenseAmount',
            key: 'expenseAmount',
        },
        {
            title: <CapHeading type="h4">Date</CapHeading>,
            dataIndex: 'expenseDate',
            key: 'expenseDate',
        },
        {
            title: <CapHeading type="h4">Category</CapHeading>,
            dataIndex: 'expenseCategory',
            key: 'expenseCategory',
        },
        {
            title: <CapHeading type="h4">Remove Expense</CapHeading>,
            dataIndex: 'remove_expense',
            key: 'remove_expense',
            width: '15%',
            render: (_, record) => (
                <CapButton type="danger" onClick={() =>{ 
                    handleRemove(record.key)
                    console.log('recordId:', record.key);
                }}>Remove</CapButton>
            ),
        }
    ];

    const data = localExpenses.map(expense => ({
        key: expense.id,
        expenseName: expense.description,
        expenseAmount: expense.amount,
        expenseDate: expense.date,
        expenseCategory: expense.category,
    }));
    console.log("loading: ", loading);
    if (loading) {
        return <CapHeading type="h3">Loading...</CapHeading>;
    }
    if (error) {
        return <CapHeading type="h3">Error fetching expenses</CapHeading>;
    }
    return <Table className={className} columns={columns} dataSource={data} />;
};

const mapStateToProps = createStructuredSelector({
    expenses : makeExpensesSelector(),
    loading: makeLoadingSelector(),
    error: makeErrorSelector(),
});

// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(actions, dispatch),
// });
const mapDispatchToProps = dispatch => ({
    deleteExpenseRequest : (expense) => dispatch(deleteExpenseRequest(expense)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);