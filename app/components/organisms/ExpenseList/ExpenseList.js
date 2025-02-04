import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CapHeading, CapButton, CapModal, CapInput, CapRow } from '@capillarytech/cap-ui-library';
import { Table } from 'antd';
import { deleteExpenseRequest, editExpenseRequest } from '../../pages/ExpenseTrackerHome/actions';
import { createStructuredSelector } from 'reselect';
import { makeExpensesSelector, makeLoadingSelector, makeErrorSelector } from '../../pages/ExpenseTrackerHome/selectors';
import { render } from 'less';
import { useState } from 'react';
import ExpenseEditForm from '../ExpenseEditForm/ExpenseEditForm';

const ExpenseList = ({ className, expenses, loading, error, deleteExpenseRequest }) => {
    console.log("Rendering ExpenseList: ", expenses);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    useEffect(() => {
        console.log("Updated Expenses from Redux:", expenses);
    }, [expenses]);

    const handleRemove = (key) => {
        console.log('Removing Expense with key:', key);
        deleteExpenseRequest(key);
    };
    const handleEditClick = (expense) => {
        console.log('Inside Edit Expense:', expense);
        setSelectedExpense(expense);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedExpense(null);
    };
    // const EditExpense = () => {
    //     console.log('Inside Edit Expense');
    // }
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
            render: (_, record) => (
                <CapButton type="primary" 
                   onClick={() => {
                     handleEditClick(record)
                     console.log("record from edit:",record);
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
    
    return (
    <>
    <Table columns={columns} dataSource={data} />
      <CapModal
                 title="Edit Expense"
                 visible={isModalVisible}
                 onCancel={handleModalClose}
                 footer={null}
            >
                {selectedExpense && <ExpenseEditForm expense={selectedExpense} onClose={handleModalClose} />}
            </CapModal>

    </>
    )
};

const mapStateToProps = createStructuredSelector({
    expenses: makeExpensesSelector(),
    loading: makeLoadingSelector(),
    error: makeErrorSelector(),
});

const mapDispatchToProps = (dispatch) => ({
    deleteExpenseRequest: (expense) => dispatch(deleteExpenseRequest(expense)),
    //editExpenseRequest: (expense) => dispatch(editExpenseRequest(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
{/* <CapRow>
<CapInput
    label="Expense Name"
    value={selectedExpense.expenseName}
    onChange={(e) => handleInputChange('expenseName', e.target.value)}
/>
<CapInput
    label="Amount"
    type="number"
    value={selectedExpense.expenseAmount}
    onChange={(e) => handleInputChange('expenseAmount', e.target.value)}
/>
<CapInput
    label="Date"
    type="date"
    value={selectedExpense.expenseDate}
    onChange={(e) => handleInputChange('expenseDate', e.target.value)}
/>
<CapInput
    label="Category"
    value={selectedExpense.expenseCategory}
    onChange={(e) => handleInputChange('expenseCategory', e.target.value)}
/>
</CapRow> */}
