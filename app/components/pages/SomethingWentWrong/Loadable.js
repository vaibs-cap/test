/**
 *
 * Asynchronously loads the component for SomethingWentWrong
 *
 */

import React, { lazy, Suspense } from 'react';

const LoadableComponent = lazy(() => import('./index'));

export default () => (
  <Suspense fallback={null}>
    <LoadableComponent />
  </Suspense>
);
