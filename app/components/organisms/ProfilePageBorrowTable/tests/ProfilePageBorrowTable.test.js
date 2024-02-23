import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePageBorrowTable from '../ProfilePageBorrowTable';

describe('User Profile borrowed book', () => {
  test('should render the components', () => {
    render(<ProfilePageBorrowTable />);

    const linkElement = screen.getByText(/Book Title/);
    expect(linkElement).toBeInTheDocument();

    const capTable = screen.findByRole('columnheader', {
      name: /Book Author/i
    })
    
    expect(capTable).toBeInTheDocument();
  });
 
});
