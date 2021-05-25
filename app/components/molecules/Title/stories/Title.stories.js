import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgramTitle from '../Title';

storiesOf('ProgramTitle', module).add('default', () => 
  <ProgramTitle 
    title="Test Program"
    sortOrder="DESCEND"
    isLoading={false}
    className='loyalty-detail-table-header-name'
    description="Test description"
    showDescSort={true}
    showTitleSort={false}
    skeletonWidth="2.285rem"
    skeletonHeight="2.285rem"
  />
);

storiesOf('ProgramTitle', module).add('test', () => 
  <ProgramTitle 
    title="Test second"
    sortOrder="DESCEND"
    isLoading={false}
    className='loyalty-detail-table-header-name'
    description="Test description"
    showDescSort={false}
    showTitleSort={false}
    skeletonWidth="2.285rem"
    skeletonHeight="2.285rem"
  />
);
