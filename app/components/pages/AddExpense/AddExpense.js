import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { CapRow, CapForm, CapButton } from "@capillarytech/cap-ui-library";
import { useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import * as actions from "./actions";
import injectSaga from "@capillarytech/cap-coupons/utils/injectSaga";
import injectReducer from "@capillarytech/cap-coupons/utils/injectReducer";
import saga from "./saga";
import { makeErrorSelector, makeExpensesSelector, makeLoadingSelector } from "./selectors";
import NavBar from "../../organisms/NavBar1/NavBar"
import { addExpenseRequest } from "./actions";

const AddExpense = ({className, expenses, loading, error, addExpenseRequest}) => {
    const [expenseData, setExpenseData] = useState({
        id: '',
        amount: "",
        category: "",
        date: "",
        description: "",
    });

    const setExpenseDataToNull = () => {
        setExpenseData({
            id: '',
            amount: "",
            category: "",
            date: "",
            description: "",
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!expenseData.description || !expenseData.amount || !expenseData.category || !expenseData.date) {
            alert("Please fill all fields!");
            return;
        }
        
        addExpenseRequest(expenseData);
        setExpenseDataToNull();
       
    };

    return (
        <>
        <NavBar/>
         <CapRow>
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="description" value={expenseData.description} onChange={handleChange} required />
                </div>

                <div>
                    <label>Amount:</label>
                    <input type="number" name="amount" value={expenseData.amount} onChange={handleChange} required />
                </div>

                <div>
                    <label>Category:</label>
                    <input type="text" name="category" value={expenseData.category} onChange={handleChange} required />
                </div>

                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={expenseData.date} onChange={handleChange} required />
                </div>

                <CapButton type="primary" htmlType="submit">
                    Add Expense
                </CapButton>
            </form>
            </CapRow>
        </>
    );
};


const mapStateToProps = (state) =>  createStructuredSelector({
    expenses: makeExpensesSelector(state),
    loading: makeLoadingSelector(),
    error: makeErrorSelector(),
});


const mapDispatchToProps = (dispatch) => ({
    addExpenseRequest: (expenseData) => dispatch(addExpenseRequest(expenseData)),
});
const withSaga = injectSaga({ key: "expenses_add", saga });
//  const withReducer = injectReducer({
//      key: "expenses-add",
//      reducer: expenseReducer,
//  });
const withConnect = connect(mapStateToProps, mapDispatchToProps,);


export default compose(withConnect, withSaga)(AddExpense);
//export default AddExpense;