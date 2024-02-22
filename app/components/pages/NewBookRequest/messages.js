/*
 * NewBookRequest Page Messages
 *
 * This contains all the text for the NewBookRequest container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'loyaltyPlus.components.pages.NewBookRequest';

export default defineMessages({
  headingText: {
    id: `${scope}.headingText`,
    defaultMessage: 'Books Requested',
  },
  bookName: {
    id: `${scope}.bookName`,
    defaultMessage: 'Book Name:',
  },
  authorName: {
    id: `${scope}.authorName`,
    defaultMessage: 'Author Name:',
  },
  buttonText: {
    id: `${scope}.buttonText`,
    defaultMessage: 'Create Request',
  },
});
