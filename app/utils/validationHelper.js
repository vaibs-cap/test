import isString from 'lodash/isString';
export const isEmail = value => {
  const emailRegex = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //eslint-disable-line
  );
  return emailRegex.test(value);
};

export const getBoolean = value => (isString(value) ? value === 'true' : value);
