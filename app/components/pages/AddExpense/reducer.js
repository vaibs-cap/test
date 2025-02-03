export const initialState = {
    expenses: [],
    loading: false,
    error: null,
};

// const expenseAddReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case types.ADD_EXPENSE_REQUEST:
//             return state.set('loading', true).set('error', null);
//         case types.ADD_EXPENSE_SUCCESS:
//             return state.update('expenses', expenses => {
//                 expenses.push(fromJS(action.payload))
//                 .set('loading', false);
//                 console.log('expenses from Reducer:', expenses.toJS());
//             }); 
//         case types.ADD_EXPENSE_FAILURE:
//             return state.set('loading', false).set('error', action.payload);
//         default:
//             return state;
//  }
// };