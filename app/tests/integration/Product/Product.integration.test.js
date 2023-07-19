import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import userEvent from '@testing-library/user-event';

import {
  render,
  /* eslint-disable import/named */
  fireEvent,
  screen,
  within,
  /* eslint-enable import/named */
} from '@testing-library/react';

// import * as helper from './helper';

import { setupServer } from 'msw/node';
import { mockInitialState } from '../commonMocks/initialState';
import App from '../../../components/pages/App';
import configureStore from '../../../configureStore';
import { publicPath } from '../../../config/path';
import { categories, categoryData, tableData } from './mocks/apiResponse';

export const server = setupServer(
  rest.get(`http://localhost:3000/products`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(tableData)),
  ),
  rest.get(`http://localhost:3000/products/categories`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(categories)),
  ),
  rest.get(
    `http://localhost:3000/products/category/smartphones`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(categoryData)),
  ),
);
// jest.setTimeout(250000);

let history;

const initializeProduct = () => {
  const store = configureStore(mockInitialState, history);
  history = createMemoryHistory();
  history.push(publicPath);

  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  );
};

describe('Product Integration Tests', () => {
  beforeEach(() => {
    server.listen();
    localStorage.clear();
    localStorage.setItem('token', true);
  });

  afterAll(() => {
    server.resetHandlers();
    server.close();
    jest.resetAllMocks();
    delete window?.capAuth;
  });

  test('Should load initial table data', async () => {
    initializeProduct();
    const perfumeData = await screen.findAllByRole('cell', {
      name: /perfume oil/i,
    });
    expect(perfumeData[0]).toBeInTheDocument();
  });

  test('Should handle search query', async () => {
    initializeProduct();
    const searchBar = await screen.findByPlaceholderText('Enter value');
    expect(searchBar).toBeInTheDocument();
    await fireEvent.change(searchBar, { target: { value: 'fog' } });
    expect(searchBar).toHaveValue('fog');
    const searchedObj = await screen.findByRole('cell', {
      name: /fog scent xpressio perfume/i,
    });
    expect(searchedObj).toBeInTheDocument();
  });

  test('should handle filtering', async () => {
    initializeProduct();
    const dropdown = await screen.findByText('Select Option');
    expect(dropdown).toBeInTheDocument();
    userEvent.click(dropdown);
    const option = await screen.findByText('smartphones');
    expect(option).toBeInTheDocument();
    userEvent.click(option);
    const phoneData = await screen.findAllByRole('cell', {
      name: /iphone 9/i,
    });
    expect(phoneData[0]).toBeInTheDocument();
  });

  test('should open modal', async () => {
    initializeProduct();
    const perfumeOil = await screen.findAllByRole('cell', {
      name: /perfume oil/i,
    });
    expect(perfumeOil[0]).toBeInTheDocument();
    const modalLink = await screen.findAllByText(/view/i);
    expect(modalLink[0]).toBeInTheDocument();
    userEvent.click(modalLink[0]);
    const modalText = await screen.findByText('Impression of Acqua Di Gio');
    expect(modalText).toBeInTheDocument();
  });

  // test('should redirect to add page', async () => {
  //     initializeProduct();
  //     const linkBtn = await screen.findByRole('button', {
  //         name: /add product/i
  //     });
  //     expect(linkBtn).toBeInTheDocument();
  //     await userEvent.click(linkBtn);
  //     await new Promise((r) => setTimeout(r, 2000));
  //     screen.debug();
  //     expect(history.location.pathname).toBe(`${publicPath}/add`);
  //     });
});
