import * as saga from '../saga';
import fetch from 'node-fetch';
globalThis.fetch = fetch;


describe('api test', () => {
    it('should return valid data', async() => {
      const data=await saga.getProducts("",undefined,1);
      expect(data).toBeDefined();
    });
  });
