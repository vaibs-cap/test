import React from 'react';
import { CapHeading, CapButton } from '@capillarytech/cap-ui-library';
export const columns = [
  {
    title: <CapHeading type="h3">Book Title</CapHeading>,
    dataIndex: 'book_name',
    key: 'book_name',
    width: '15%',
  },
  {
    title: <CapHeading type="h3">Book Author</CapHeading>,
    dataIndex: 'book_author',
    key: 'book_author',
    width: '15%',
  },

  {
    title: <CapHeading type="h3">Book Genre</CapHeading>,
    dataIndex: 'book_genre',
    key: 'book_genre',
    width: '15%',
  },

  {
    title: <CapHeading type="h3">Request Date</CapHeading>,
    dataIndex: 'request_date',
    key: 'request_date',
    width: '15%',
  },

  {
    title: <CapHeading type="h3">Due Date</CapHeading>,
    dataIndex: 'due_date',
    key: 'due_date',
    width: '15%',
  },
  {
    render: () => (
      <CapButton type="secondary" size="small" variant="contained">
        Return Book
      </CapButton>
    ),
  },
];

export const FETCH_USER_BORROWED_BOOKS = 'FETCH_USER_BORROWED_BOOKS';
export const FETCH_USER_BORROWED_BOOKS_SUCCESS ='FETCH_USER_BORROWED_BOOKS_SUCCESS';
export const FETCH_USER_BORROWED_BOOKS_FAILURE ='FETCH_USER_BORROWED_BOOKS_FAILURE';

export const RETURN_USER_BORROWED_BOOKS ='RETURN_USER_BORROWED_BOOKS';
export const RETURN_USER_BORROWED_BOOKS_SUCCESS ='RETURN_USER_BORROWED_BOOKS_SUCCESS';
export const RETURN_USER_BORROWED_BOOKS_FAILURE ='RETURN_USER_BORROWED_BOOKS_FAILURE';

