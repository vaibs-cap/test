import React from 'react'
import {CapRow} from '@capillarytech/cap-ui-library';
import Graph from './Graph';
import { connect } from 'react-redux';
import { makeExpensesSelector } from '../../pages/ExpenseTrackerHome/selectors';
import { createStructuredSelector } from 'reselect';
import NavBar from '../NavBar1/NavBar';

const ExpenseGraph = ({expenses}) => {
  return (
    <CapRow>
        <NavBar />
       <Graph expenses={expenses}/>
    </CapRow>
  )
}
const mapStateToProps = (state) =>  
    createStructuredSelector({
    expenses: makeExpensesSelector(state),
    });
export default connect(mapStateToProps)(ExpenseGraph);

// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { compose } from "redux";
// import { createStructuredSelector } from "reselect";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import { fetchExpenseRequest } from "./actions";
// import { makeExpensesGraphSelector, makeLoadingGraphSelector } from "./selectors";
// import injectSaga from '@capillarytech/cap-coupons/utils/injectSaga';
// import injectReducer from '@capillarytech/cap-coupons/utils/injectReducer';
// import saga from './saga';
// import { expenseGraphReducer } from "./reducer";


// const ExpenseGraph = ({ expenses, fetchExpenses }) => {
//     useEffect(() => {
//         fetchExpenses();
//     }, [fetchExpenses]);

//     const categoryWiseData = expenses.reduce((acc, expense) => {
//         const category = expense.category;
//         if (!acc[category]) {
//             acc[category] = { category, totalAmount: 0 };
//         }
//         acc[category].totalAmount += expense.amount;
//         return acc;
//     }, {});

//     const chartData = Object.values(categoryWiseData); 

//     return (
//         <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="category" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="totalAmount" fill="#8884d8" />
//             </BarChart>
//         </ResponsiveContainer>
//     );
// };

// const mapStateToProps = createStructuredSelector({
//     expenses: makeExpensesGraphSelector(),
//     loading: makeLoadingGraphSelector(),
// });

// const mapDispatchToProps = (dispatch) => ({
//     fetchExpenses: () => dispatch(fetchExpenseRequest()),
// });
// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// const withSaga = injectSaga({ key: 'expensesGraph', saga });
// const withReducer = injectReducer({
//   key: 'expensesGraph',
//   reducer: expenseGraphReducer,
// });

// export default compose(
//   withSaga,
//   withReducer,
//   withConnect,
// )(ExpenseGraph);
// //export default connect(mapStateToProps, mapDispatchToProps)(ExpenseGraph);
