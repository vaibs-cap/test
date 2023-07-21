import * as saga from '../saga';
import fetch from 'node-fetch';
globalThis.fetch = fetch;


describe('api test', () => {
  it('should return category data', async() => {
    const data=await saga.getCategory();
    expect(data).toBeDefined();
  });
  it('should return product data', async() => {
    const data=await saga.getProducts("",undefined,1);
    expect(data).toBeDefined();
  });
  });
