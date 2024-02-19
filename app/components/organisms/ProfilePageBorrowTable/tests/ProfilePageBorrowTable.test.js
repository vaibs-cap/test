import React from 'react';
import {render, screen} from '@testing-library/react';
import ProfilePageBorrowTable from '../ProfilePageBorrowTable';

describe('Profile page borrowed book component tests', () => {
it('render profile page borrowed books', ()=> {
    render(<ProfilePageBorrowTable/>);
    const linkElement = screen.getByText(/My books/);
    expect(linkElement).toBeInTheDocument();
});

});