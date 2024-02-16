import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { CapTable } from '@capillarytech/cap-ui-library';
import { bookData } from './bookData';

const dataSource = bookData[0].users[0].requested_books;
const columns = [
  {
    title: 'Book Name',
    dataIndex: 'book_id',
    key: 'book_id',
  },
  {
    title: 'Request Date',
    dataIndex: 'request_date',
    key: 'request_date',
  },
];
const ProfilePage = ({ className, intl: { formatMessage } }) => {
  return (
    <div>
      <CapTable
        dataSource={dataSource}
        id="capTable_rentedBooks"
        columns={columns}
      />
    </div>
  );
};

ProfilePage.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

ProfilePage.defaultProps = {};

export default injectIntl(ProfilePage);
