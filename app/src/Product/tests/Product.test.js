import React from "react";
import { render, waitFor,screen, fireEvent, cleanup} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';

import {Product} from "../Product"
import * as actions from '../actions';

import fetch from 'node-fetch'
globalThis.fetch = fetch

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve([{"id":1,"title":"Anuroop","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"]},{"id":2,"title":"iPhone X","description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...","price":899,"discountPercentage":17.94,"rating":4.44,"stock":34,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/2/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/2/1.jpg","https://i.dummyjson.com/data/products/2/2.jpg","https://i.dummyjson.com/data/products/2/3.jpg","https://i.dummyjson.com/data/products/2/thumbnail.jpg"]},{"id":3,"title":"Samsung Universe 9","description":"Samsung's new variant which goes beyond Galaxy to the Universe","price":1249,"discountPercentage":15.46,"rating":4.09,"stock":36,"brand":"Samsung","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/3/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/3/1.jpg"]},{"id":4,"title":"OPPOF19","description":"OPPO F19 is officially announced on April 2021.","price":280,"discountPercentage":17.91,"rating":4.3,"stock":123,"brand":"OPPO","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/4/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/4/1.jpg","https://i.dummyjson.com/data/products/4/2.jpg","https://i.dummyjson.com/data/products/4/3.jpg","https://i.dummyjson.com/data/products/4/4.jpg","https://i.dummyjson.com/data/products/4/thumbnail.jpg"]},{"id":5,"title":"Huawei P30","description":"Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.","price":499,"discountPercentage":10.58,"rating":4.09,"stock":32,"brand":"Huawei","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/5/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/5/1.jpg","https://i.dummyjson.com/data/products/5/2.jpg","https://i.dummyjson.com/data/products/5/3.jpg"]}]),
//   })
// );

describe('Product Component Tests', () => {

  test('should render the components', () => {
    render(<Product actions={actions} productDetails={{}}/>);
    waitFor(() => {expect(screen.getByRole('cell', {
        name: /iphone 9/i
      })).toBeInTheDocument()});
  })

  test('should handle search query', async() => {
    render(<Product actions={actions} productDetails={{}}/>);
    const searchBtn= await screen.findByPlaceholderText('Enter value');
    waitFor(() => {expect(searchBtn).toBeInTheDocument()});
    await userEvent.type(searchBtn,'oil');
    waitFor(()=>{expect(screen.getByRole('cell', {
        name: /tree oil 30ml/i
      })).toBeInTheDocument();
    });
  })  

  test('should clear search query', async() => {
    const {container}= render(<Product actions={actions} productDetails={{}}/>);
    const searchBtn= await screen.findByPlaceholderText('Enter value');
    waitFor(() => {expect(searchBtn).toBeInTheDocument()});
    await userEvent.type(searchBtn,'oil');
    await userEvent.click(container.querySelector('#filter_svg__a'));
    waitFor(() => {expect(searchBtn).toHaveValue("")});    
  })
  
  test('should handle filtering', () => {
    const {queryAllByText, getByText, container} =render(<Product actions={actions} productDetails={{}}/>);
    waitFor(expect(getByText('Select Option')).toBeInTheDocument());
    const dropdown= screen.getByText('Select Option');
    waitFor(()=>{userEvent.mouseDown(dropdown)}); 
    screen.debug();
    waitFor(expect(screen.getByText('fragrances'))).toBeInTheDocument();
  })  


  //async-await not working hence used waitFor()
  test('should open modal', () => {
    render(<Product actions={actions} productDetails={{}}/>);
    waitFor(() => {expect(screen.getByRole('cell', {
      name: /iphone 9/i
    })).toBeInTheDocument()});
    const modalLink= screen.findAllByText(/view/i);
    waitFor(() => {expect(modalLink).toBeInTheDocument()});
    waitFor(()=>{userEvent.click(modalLink)});
    waitFor(() => {expect(screen.findByRole('heading', {
      name: /an apple mobile which is nothing like apple/i
    })).toBeInTheDocument()});
  })

})
