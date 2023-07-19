import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import history from 'utils/history';
import * as actions from '../actions';
import ProductAdd from '../ProductAdd';
import configureStore from '../../../configureStore';
import initialState from '../../../initialState';
import { Provider } from 'react-redux';

// const mockPush = jest.fn();
// jest.mock('../ProductAdd', () => ({
//   ...jest.requireActual('../ProductAdd'),
//   goHome: mockPush,
// }));

describe('ProductAdd Component Tests', () => {
  test('should render the components', async () => {
    render(setup());
    const addBtn = await screen.getByRole('button', {
      name: /submit/i,
    });
    expect(addBtn).toBeInTheDocument();
    await checkAvailable('title');
    await checkAvailable('description');
    await checkAvailable('brand');
    await checkAvailable('category');
    await checkAvailable('price');
    await checkAvailable('stock');
    const backBtn = await screen.getByRole('button', {
      name: /go back/i,
    });
    expect(backBtn).toBeInTheDocument();
  });

  test('should enable button when fields are filled', async () => {
    render(setup());
    const addBtn = await screen.findByRole('button', {
      name: /submit/i,
    });
    expect(addBtn).toBeInTheDocument();
    await typeText('title', 'text');
    expect(addBtn).toBeDisabled();
    await typeText('description', 'text');
    expect(addBtn).toBeDisabled();
    await typeText('brand', 'text');
    expect(addBtn).toBeDisabled();
    await typeText('category', 'text');
    expect(addBtn).toBeDisabled();
    await typeText('price', 'text');
    expect(addBtn).toBeDisabled();
    await typeText('stock', 'text');
    expect(addBtn).toBeEnabled();
  });

  // test('should redirect to homepage', async () => {
  //   render(setup());
  //   const backBtn = await screen.findByRole('button', {
  //     name: /go back/i,
  //   });
  //   expect(backBtn).toBeInTheDocument();
  //   await userEvent.click(backBtn);
  //   waitFor(() => expect(mockPush).toHaveBeenCalled());
  // });
});

const typeText = async (element, text) => {
  const field = await screen.findByPlaceholderText(`Enter ${element}`);
  expect(field).toBeInTheDocument();
  userEvent.type(field, text);
};

const checkAvailable = async element => {
  const field = await screen.findByPlaceholderText(`Enter ${element}`);
  expect(field).toBeInTheDocument();
};

const setup = () => {
  let store = configureStore(initialState, history);
  return (
    <Provider store={store}>
      <ProductAdd actions={actions} newProductDetails={undefined} />
    </Provider>
  );
};
