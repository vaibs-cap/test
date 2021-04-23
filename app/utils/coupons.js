export const getDiscountDetails = ({ couponConfig, orgDetails }) => {
  const currency =
    orgDetails.basic_details && orgDetails.basic_details.base_currency;
  const { discountType, discountValue, discountUpto } = couponConfig;
  const currecnyValue = discountType === 'PERC' ? '' : currency;
  const isNoDiscountValue = discountValue === '' || discountValue === undefined;
  const discountUptoValue = discountUpto === null ? 'XXX' : discountUpto;
  return `${currecnyValue} ${isNoDiscountValue ? 'XXX' : discountValue} ${
    discountType === 'PERC' ? '%' : ''
  } Off ${discountUpto ? `upto ${currency} ${discountUptoValue}` : ''}
  `;
};

export const getNumOfCoupons = ({ couponConfig }) => {
  const { numIssued, numTotal } = couponConfig;
  let numOfCoupons = '';
  const unIssuedCount = numTotal - numIssued;
  if (numTotal > 0) {
    numOfCoupons = `${numTotal}
    ${unIssuedCount > 0 ? `( ${unIssuedCount} unissued)` : ''}`;
  } else if (numTotal === -1) {
    numOfCoupons = 'Unlimited coupons';
  } else {
    numOfCoupons = numTotal;
  }
  return numOfCoupons;
};
