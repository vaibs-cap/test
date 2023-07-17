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
import { Provider } from 'react-redux';
import fetch from 'node-fetch';
import configureStore from '../../../configureStore';
import initialState from '../../../initialState';

import { Product } from '../Product';
import * as actions from '../actions';

globalThis.fetch = fetch;

const mockPush = jest.fn();
jest.mock('../Product', () => ({
  ...jest.requireActual('../Product'),
  goHome: mockPush,
}));

describe('Product Component Tests', () => {
  test('should render the components', () => {
    render(setup());
    waitFor(() => {
      expect(
        screen.getByRole('cell', {
          name: /iphone 9/i,
        }),
      ).toBeInTheDocument();
    });
  });

  test('should handle search query', async () => {
    render(setup());
    const searchBar = await screen.findByPlaceholderText('Enter value');
    waitFor(() => {
      expect(searchBar).toBeInTheDocument();
    });
    await userEvent.type(searchBar, 'oil');
    waitFor(() => {
      expect(
        screen.getByRole('cell', {
          name: /tree oil 30ml/i,
        }),
      ).toBeInTheDocument();
    });
  });

  test('should clear search query', async () => {
    const { container } = render(setup());
    const searchBar = await screen.findByPlaceholderText('Enter value');
    waitFor(() => {
      expect(searchBar).toBeInTheDocument();
    });
    await userEvent.type(searchBar, 'oil');
    await userEvent.click(container.querySelector('#filter_svg__a'));
    waitFor(() => {
      expect(searchBar).toHaveValue('');
    });
  });

  // FAILING
  test('should handle filtering', () => {
    const { queryAllByText, getByText, container } = render(setup());
    waitFor(expect(getByText('Select Option')).toBeInTheDocument());
    const dropdown = screen.getByText('Select Option');
    waitFor(() => {
      userEvent.mouseDown(dropdown);
    });
    screen.debug();
    waitFor(expect(screen.getByText('fragrances'))).toBeInTheDocument();
  });

  test('should open modal', () => {
    render(setup());
    waitFor(() => {
      expect(
        screen.getByRole('cell', {
          name: /iphone 9/i,
        }),
      ).toBeInTheDocument();
    });
    const modalLink = screen.findAllByText(/view/i);
    waitFor(() => {
      expect(modalLink).toBeInTheDocument();
    });
    waitFor(() => {
      userEvent.click(modalLink);
    });
    waitFor(() => {
      expect(
        screen.findByRole('heading', {
          name: /an apple mobile which is nothing like apple/i,
        }),
      ).toBeInTheDocument();
    });
  });

  test('should redirect to add page', async () => {
    const { container } = render(setup());
    const linkBtn = await screen.findByRole('button', {
      name: /add product/i
    });
    waitFor(() => {
      expect(linkBtn).toBeInTheDocument();
    });
    await userEvent.click(linkBtn);
    waitFor(() => expect(mockPush).toHaveBeenCalled());
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
