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
