import React from 'react';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';

const Label = ({ type, text }) => (
  <CapHeading.CapHeadingSpan type={type}>{text}</CapHeading.CapHeadingSpan>
);

export default Label;
