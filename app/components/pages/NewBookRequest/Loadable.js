import React, { lazy, Suspense } from 'react';
import CapSpin from '@capillarytech/cap-ui-library/CapSpin';

const LoadableComponent = lazy(() => import('./NewBookRequest'));

export default () => (
  <Suspense fallback={<CapSpin />}>
    <LoadableComponent />
  </Suspense>
);
