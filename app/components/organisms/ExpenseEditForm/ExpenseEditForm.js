import React, { useState, useEffect } from 'react';
import { CapForm, CapInput, CapButton, CapHeading, CapInputSearch } from '@capillarytech/cap-ui-library';
import { connect } from 'react-redux';
import { editExpenseRequest } from '../../pages/ExpenseTrackerHome/actions';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeExpensesSelector } from '../../pages/ExpenseTrackerHome/selectors';

const ExpenseEditForm = ({ expense, onClose, editExpenseRequest }) => {
    const [editedExpense, setEditedExpense] = useState({
        id: '',
        description: '',
        amount: '',
        date: '',
        category: ''
    });
    //console.log(`Cap Ui lib: ${CapForm} ${CapInput} `);
    useEffect(() => {
        if (expense) {
            setEditedExpense({
                id: expense.key, 
                description: expense.expenseName,
                amount: expense.expenseAmount,
                date: expense.expenseDate,
                category: expense.expenseCategory
            });
        }
    }, [expense]);

    const handleChange = (e) => {
        setEditedExpense({
            ...editedExpense,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editExpenseRequest(editedExpense);
        onClose(); // Close modal after updating
    };

    return (
        <CapForm onSubmit={handleSubmit}>
            <CapHeading type="h4">Edit Expense</CapHeading>
            
            <CapInput 
                name="description"
                label="Expense Name"
                value={editedExpense.description}
                onChange={handleChange}
                required
            />
            
            <CapInput 
                name="amount"
                label="Amount"
                type="number"
                value={editedExpense.amount}
                onChange={handleChange}
                required
            />

            <CapInput 
                name="date"
                label="Date"
                type="date"
                value={editedExpense.date}
                onChange={handleChange}
                required
            />

            <CapInput 
                name="category"
                label="Category"
                value={editedExpense.category}
                onChange={handleChange}
                required
            />

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <CapButton type="danger" onClick={onClose}>
                    Cancel
                </CapButton>
                <CapButton type="primary" htmlType="submit">
                    Save Changes
                </CapButton>
            </div>
        </CapForm>
    );
};
const mapStateToProps = state =>
    createStructuredSelector({
        expense : makeExpensesSelector(state),
    })
// Only map dispatch to props, no need for state mapping
const mapDispatchToProps = (dispatch) => ({
    editExpenseRequest: (expense) => dispatch(editExpenseRequest(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseEditForm);
