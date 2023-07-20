import React from 'react';
import {
  render,
  waitFor,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import history from 'utils/history';
import configureStore from '../../../configureStore';
import initialState from '../../../initialState';

import Product from '../Product';
import * as actions from '../actions';
import { Provider } from 'react-redux';


// const mockPush = jest.fn();
// jest.mock('../Product', () => ({
//   ...jest.requireActual('../Product'),
//   goHome: mockPush,
// }));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(['smartphones','fragrances']),
  }));


describe('Product Component Tests', () => {
  test('should render the components', async() => {
    render(setup());
    const searchBar = await screen.findByPlaceholderText('Enter value');
    expect(searchBar).toBeInTheDocument();
    const datePicker = await screen.findByRole('textbox', {
        name: /start date/i
      })
    expect(datePicker).toBeInTheDocument();
    const selectDropdown = await screen.findByText('Select Option');
    expect(selectDropdown).toBeInTheDocument();
    const gotoBtn = await screen.findByRole('button', {
        name: /add product/i
      });
    expect(gotoBtn).toBeInTheDocument();
    const capTable = await screen.findByRole('columnheader', {
        name: /product title the product/i
      })
    expect(capTable).toBeInTheDocument();
});

  test('should clear search query', async () => {
    const { container } = render(setup());
    const searchBar = await screen.findByPlaceholderText('Enter value');
    expect(searchBar).toBeInTheDocument();
    await userEvent.type(searchBar, 'oil');
    await userEvent.click(container.querySelector('#filter_svg__a'));
    expect(searchBar).toHaveValue('');
  });

  test('dropdown component should work', async () => {
    const { container } = render(setup());
    const selectDropdown = await screen.findByText('Select Option');
    expect(selectDropdown).toBeInTheDocument();
    userEvent.click(selectDropdown);
    const option = await screen.findByText('smartphones')
    expect(option).toBeInTheDocument();
  });

  test('should redirect to add page', async () => {
    const { container } = render(setup());
    const linkBtn = await screen.findByRole('button', {
      name: /add product/i
    });
    expect(linkBtn).toBeInTheDocument();
    userEvent.click(linkBtn);
    expect(history.location.pathname).toBe('/product/add')
  });
});

const setup = () => {
  let store = configureStore(initialState, history);
  return (
    <Provider store={store}>
      <Product actions={actions} productDetails={undefined} />
    </Provider>
  );
};
