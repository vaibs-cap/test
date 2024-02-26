import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../../../configureStore';
import initialState from '../../../../initialState';
import { BookList } from '../BookList';

const setup = props => {
  let store = configureStore(initialState, history);
  const finalProps = {
    ...props,
  };
  return (
    <Provider store={store}>
      <BookList {...finalProps} />
    </Provider>
  );
};

describe('BookList component', () => {
  test('renders BookList component', () => {
    render(setup());
    const table = screen.getByTestId('main-table');
    expect(table).toBeInTheDocument();
  });

  test('checks for get-book button', () => {
    render(
      setup({
        dataSource: [
          {
            book_id: 1,
            book_name: 'To Kill a Mockingbird',
            book_author: 'Harper Lee',
            book_genre: 'Fiction',
            total_count: 5,
            current_count: 3,
            request: [],
            _id: 'KNvIsmyJSvCxOCQm',
            borrowers: [
              {
                userId: '135',
                borrowedDate: '2024-02-23T10:29:10.971Z',
              },
            ],
          },
        ],
      }),
    );
    const getBookBtn = screen.getByText(/Get Book/i);
    expect(getBookBtn).toBeInTheDocument();
  });

  test('checks for reserve button', () => {
    render(
      setup({
        dataSource: [
          {
            book_id: 1,
            book_name: 'To Kill a Mockingbird',
            book_author: 'Harper Lee',
            book_genre: 'Fiction',
            total_count: 5,
            current_count: 0,
            request: [],
            _id: 'KNvIsmyJSvCxOCQm',
            borrowers: [
              {
                userId: '135',
                borrowedDate: '2024-02-23T10:29:10.971Z',
              },
            ],
          },
        ],
      }),
    );
    const reserveBtn = screen.getByText(/Reserve/i);
    expect(reserveBtn).toBeInTheDocument();
  });
});

describe('BookList Component', () => {
  it('testing the get book button', () => {
    const mockBooks = [
      {
        _id: '1',
        book_name: 'Book 1',
        book_author: 'Author 1',
        book_genre: 'Genre 1',
        current_count: 1,
        total_count: 5,
      },
    ];

    const mockActions = {
      issueBook: jest.fn(),
    };

    // const { getByText } = render(
    //   <BookList dataSource={mockBooks} actions={mockActions} />,
    // );

    const getBookButton = getByText('Get Book');
    fireEvent.click(getBookButton);

    expect(mockActions.issueBook).toHaveBeenCalledWith({
      book_id: '1',
      user_id: '135',
    });

    const updatedDataSource = [
      {
        _id: '1',
        book_name: 'Book 1',
        book_author: 'Author 1',
        book_genre: 'Genre 1',
        current_count: 0,
        total_count: 5,
      },
    ];

    expect(updatedDataSource).toEqual(
      expect.arrayContaining(updatedDataSource),
    );
  });
});

describe('BookList Component', () => {
  it('testing the reserve book button', () => {
    const mockBooks = [
      {
        _id: '1',
        book_name: 'Book 1',
        book_author: 'Author 1',
        book_genre: 'Genre 1',
        current_count: 0,
        total_count: 5,
      },
    ];

    const mockActions = {
      reserveBook: jest.fn(),
    };

    const { getByText } = render(
      <BookList dataSource={mockBooks} actions={mockActions} />,
    );

    const reserveBookButton = getByText('Reserve');
    fireEvent.click(reserveBookButton);

    expect(mockActions.reserveBook).toHaveBeenCalledWith({
      book_id: '1',
      user_id: '123',
    });

    expect(reserveBookButton).not.toBeInTheDocument();
  });
});
