import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import React from 'react';
import CapCustomSelect from '@capillarytech/cap-ui-library/CapCustomSelect';

const Filter = () => (
  <>
    <CapHeader title="Capillary Library" description="Issue books" />
    <CapCustomSelect
      selectPlaceholder="filter by genre"
      options={[
        { label: 'sci-fi', key: 'sci-fi' },
        { label: 'fiction', value: 'fiction' },
      ]}
    />
  </>
);

export default Filter;
