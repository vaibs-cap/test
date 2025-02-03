import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { CapRow, CapForm, CapButton } from "@capillarytech/cap-ui-library";
import { useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import * as actions from "../../pages/ExpenseTrackerHome/actions";
import injectSaga from "@capillarytech/cap-coupons/utils/injectSaga";
import injectReducer from "@capillarytech/cap-coupons/utils/injectReducer";
import saga from "../../pages/ExpenseTrackerHome/saga";
import expenseReducer from "../../pages/ExpenseTrackerHome/reducer";
import { addExpenseRequest } from "../../pages/ExpenseTrackerHome/actions";
import { makeErrorSelector, makeExpensesSelector, makeLoadingSelector } from "../../pages/ExpenseTrackerHome/selectors";
import NavBar from "../NavBar1/NavBar"

const AddExpense = ({className, expenses, loading, error, actions}) => {
    const [expenseData, setExpenseData] = useState({
        id: '',
        amount: "",
        category: "",
        date: "",
        description: "",
    });

    //console.log("expenses from AddExpense:", expenses);

    // console.log("expensePayload:", expenses);
     //const navigate = useNavigate();
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
        //console.log("name:", name, "value:", value);
        setExpenseData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        //console.log("expenseData:", expenseData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log("handleSubmit:", e);
        // Ensure all fields are filled
        if (!expenseData.description || !expenseData.amount || !expenseData.category || !expenseData.date) {
            alert("Please fill all fields!");
            return;
        }
        // const expensesArray = expenses.toJS();
        // const maxId = expensesArray.reduce((max, expense) => Math.max(max, expense.id),0);
        // const newId = maxId + 1;
        

        //const newExpenseData = { ...expenseData, id: newId+""};
        // Dispatch Redux action
        actions.addExpenseRequest(expenseData);
        //console.log("newExpenseData:", expenseData);
        setExpenseDataToNull();
       
        // Redirect to home page after adding an expense
        //navigate("/home");
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
    actions: bindActionCreators(actions, dispatch),
});
const withSaga = injectSaga({ key: "expenses", saga });
 const withReducer = injectReducer({
     key: "expenses",
     reducer: expenseReducer,
 });
 const withConnect = connect(mapStateToProps, mapDispatchToProps,);


export default compose(withConnect, withSaga, withReducer)(AddExpense);
//export default AddExpense;