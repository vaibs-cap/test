const { NODE_ENV } = process.env;

export const IS_PROD = NODE_ENV === 'production';
export const IS_DEV = NODE_ENV === 'development';
