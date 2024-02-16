import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import React, { Fragment } from 'react';
import CapCustomSelect from '@capillarytech/cap-ui-library/CapCustomSelect';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';

const Filter = () => (
  <Fragment>
    <CapHeader
      title="Capillary Library"
      description="Issue books from Capillary Library"
    />
    <CapHeading type="h3">Filter Books</CapHeading>
    <CapCustomSelect
      showSearch
      selectPlaceholder="Select Genre"
      value=""
      options={[
        { label: 'sci-fi', value: 'sci-fi' },
        { label: 'fiction', value: 'fiction' },
      ]}
    />
    <CapCustomSelect
      showSearch
      selectPlaceholder="Select Author"
      value=""
      options={[
        { label: 'author1', value: 'sci-fi' },
        { label: 'author2', value: 'fiction' },
      ]}
    />
  </Fragment>
);

export default Filter;
