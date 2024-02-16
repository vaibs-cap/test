import React from 'react';
import BookList from '../../organisms/BookList/BookList';
import Filter from '../../organisms/Filter/Filter';

export const HomePage = () => (
  <>
    <Filter />
    <BookList />
  </>
);
