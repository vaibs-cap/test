import { CapSpin } from '@capillarytech/cap-ui-library';
import React, { Suspense, lazy } from 'react';

const LoadableComponent = lazy(() => import('./Signup'));

export default () => (
  <Suspense fallback={<CapSpin />}>
    <LoadableComponent />
  </Suspense>
);
