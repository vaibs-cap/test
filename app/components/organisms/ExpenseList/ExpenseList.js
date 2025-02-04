import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CapHeading, CapButton } from '@capillarytech/cap-ui-library';
import { Table } from 'antd';
import { deleteExpenseRequest } from '../../pages/ExpenseTrackerHome/actions';
import { createStructuredSelector } from 'reselect';
import { makeExpensesSelector, makeLoadingSelector, makeErrorSelector } from '../../pages/ExpenseTrackerHome/selectors';
import { render } from 'less';

const ExpenseList = ({ className, expenses, loading, error, deleteExpenseRequest }) => {
    console.log("Rendering ExpenseList: ", expenses);

    useEffect(() => {
        console.log("Updated Expenses from Redux:", expenses);
    }, [expenses]);

    const handleRemove = (key) => {
        console.log('Removing Expense with key:', key);
        deleteExpenseRequest(key);
    };
    const EditExpense = () => {
        console.log('Inside Edit Expense');
    }
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
            title: <CapHeading type="h4">Edit Expense</CapHeading>,
            dataIndex: 'edit_expense',
            key: 'edit_expense',
            width: '15%',
            render: (_, val) => (
                <CapButton type="primary" 
                   onClick={() => {
                     EditExpense();
                   }}
                >Edit</CapButton>
            )
        },
        {
            title: <CapHeading type="h4">Remove Expense</CapHeading>,
            dataIndex: 'remove_expense',
            key: 'remove_expense',
            width: '15%',
            render: (_, record) => (
                <CapButton type="danger" onClick={() => handleRemove(record.key)}>
                    Remove
                </CapButton>
            ),
        },
    ];

    const data = expenses.map((expense) => ({
        key: expense.id, // Ensure `id` is available in your Redux data
        expenseName: expense.description,
        expenseAmount: expense.amount,
        expenseDate: expense.date,
        expenseCategory: expense.category,
    }));

    console.log("Loading:", loading);
    if (loading) {
        return <CapHeading type="h3">Loading...</CapHeading>;
    }
    if (error) {
        return <CapHeading type="h3">Error fetching expenses</CapHeading>;
    }
    
    return <Table columns={columns} dataSource={data} />;
};

const mapStateToProps = createStructuredSelector({
    expenses: makeExpensesSelector(),
    loading: makeLoadingSelector(),
    error: makeErrorSelector(),
});

const mapDispatchToProps = (dispatch) => ({
    deleteExpenseRequest: (expense) => dispatch(deleteExpenseRequest(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
