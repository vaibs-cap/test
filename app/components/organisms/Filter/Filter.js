import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import React, { Fragment } from 'react';
import CapCustomSelect from '@capillarytech/cap-ui-library/CapCustomSelect';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import withStyles from 'utils/withStyles';
import style from './styles';

const Filter = ({ className }) => {
  return (
    <CapRow className={className}>
      <CapRow className="filter-container">
        <CapHeader
          title="Capillary Library"
          description="Issue books from Capillary Library"
        />
        <CapHeading type="h3">Filter Books</CapHeading>
        <CapRow className="filter-books-search-container">
          <CapCustomSelect
            width="28rem"
            className="select-genere-search-input"
            showSearch
            selectPlaceholder="Select Genre"
            value=""
            options={[
              { label: 'sci-fi', value: 'sci-fi' },
              { label: 'fiction', value: 'fiction' },
            ]}
          />
          <CapCustomSelect
            width="28rem"
            showSearch
            selectPlaceholder="Select Author"
            value=""
            options={[
              { label: 'author1', value: 'sci-fi' },
              { label: 'author2', value: 'fiction' },
            ]}
          />
        </CapRow>
      </CapRow>
    </CapRow>
  );
};

export default withStyles(Filter, style);
