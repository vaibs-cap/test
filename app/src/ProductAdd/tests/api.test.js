import * as saga from '../saga';
import fetch from 'node-fetch';
globalThis.fetch = fetch;


describe('api test', () => {

    const dummyData = {
        title: 'title',
        description: 'desc',
        brand: 'brand',
        category: 'mobile',
        price: '100',
        stock: '100',
      };

    it('should return valid data', async() => {
      const data=await saga.setProducts(dummyData);
      expect(data).toBeDefined();
    });
    
    // it('should throw error on invalid data', async() => {
    //     dummyData.stock='0';
    //     await expect(async()=>{await saga.setProducts(dummyData)}).toThrow(Error);
    //   });
      
  });
