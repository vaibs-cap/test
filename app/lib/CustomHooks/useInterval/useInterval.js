// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback],
  );

  // Set up the interval.
  useEffect(
    () => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    },
    [delay],
  );
};

export default useInterval;
