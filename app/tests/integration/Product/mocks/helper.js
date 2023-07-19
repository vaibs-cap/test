import {
    /* eslint-disable import/named */
    screen,
    /* eslint-enable import/named */
  } from '../../../test-utils-it';

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

export const typeText = async (element, text) => {
    const field = await screen.findByPlaceholderText(`Enter ${element}`);
    expect(field).toBeInTheDocument();
    userEvent.type(field, text);
  };
  
export const checkAvailable = async element => {
    const field = await screen.findByPlaceholderText(`Enter ${element}`);
    expect(field).toBeInTheDocument();
  };