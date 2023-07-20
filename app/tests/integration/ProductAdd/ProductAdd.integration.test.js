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
  screen,
  /* eslint-enable import/named */
} from '@testing-library/react';

import { setupServer } from 'msw/node';
import { mockInitialState } from '../commonMocks/initialState';
import App from '../../../components/pages/App';
import configureStore from '../../../configureStore';
import { publicPath } from '../../../config/path';
import {
  successData,
} from './mocks/apiResponse';
import { checkAvailable, typeText } from '../Product/mocks/helper';

export const server = setupServer(
  rest.post(`http://localhost:3000/products/add`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(successData)),
  ),
);

let history;

const initializeProductAdd = () => {
  const store = configureStore(mockInitialState, history);
  history = createMemoryHistory();
  history.push(`${publicPath}/add`);

  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  );
};

describe('ProductAdd Integration Tests', () => {
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

  test('should render success notification and clear form', async () => {
    initializeProductAdd();
    const addBtn = await screen.findByRole('button', {
      name: /submit/i,
    });
    expect(addBtn).toBeInTheDocument();
    await typeText('title', 'text');
    await typeText('description', 'text');
    await typeText('brand', 'text');
    await typeText('category', 'text');
    await typeText('price', 'text');
    await typeText('stock', 'text');
    expect(addBtn).toBeEnabled();
    await userEvent.click(addBtn);
    await new Promise(r => setTimeout(r, 1000)); //wait for modal load
    const notif = await screen.findAllByText('New Product Added Successfully');
    expect(notif[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`Enter title`)).toHaveValue('');
  });

  test('should render failure notification', async () => {
    initializeProductAdd();
    const addBtn = await screen.findByRole('button', {
      name: /submit/i,
    });
    expect(addBtn).toBeInTheDocument();
    await typeText('title', 'text');
    await typeText('description', 'text');
    await typeText('brand', 'text');
    await typeText('category', 'text');
    await typeText('price', 'text');
    await typeText('stock', '0');
    expect(addBtn).toBeEnabled();
    await userEvent.click(addBtn);
    await new Promise(r => setTimeout(r, 2000)); //wait for modal load
    const notif = await screen.findAllByText('There was an Error! Try Again');
    expect(notif[0]).toBeInTheDocument();
  });
});
