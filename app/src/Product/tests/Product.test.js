import React from "react";
import { render, waitFor,screen, fireEvent, cleanup} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import configureStore from '../../../configureStore'
import initialState from '../../../initialState'
import history from 'utils/history';
import { Provider } from 'react-redux';

import {Product} from "../Product"
import * as actions from '../actions';

import fetch from 'node-fetch'
globalThis.fetch = fetch


describe('Product Component Tests', () => {

  test('should render the components', () => {
    render(setup());
    waitFor(() => {expect(screen.getByRole('cell', {
        name: /iphone 9/i
      })).toBeInTheDocument()});
  })

  test('should handle search query', async() => {
    render(setup());
    const searchBtn= await screen.findByPlaceholderText('Enter value');
    waitFor(() => {expect(searchBtn).toBeInTheDocument()});
    await userEvent.type(searchBtn,'oil');
    waitFor(()=>{expect(screen.getByRole('cell', {
        name: /tree oil 30ml/i
      })).toBeInTheDocument();
    });
  })  

  test('should clear search query', async() => {
    const {container}= render(setup());
    const searchBtn= await screen.findByPlaceholderText('Enter value');
    waitFor(() => {expect(searchBtn).toBeInTheDocument()});
    await userEvent.type(searchBtn,'oil');
    await userEvent.click(container.querySelector('#filter_svg__a'));
    waitFor(() => {expect(searchBtn).toHaveValue("")});    
  })
  
  test('should handle filtering', () => {
    const {queryAllByText, getByText, container} =render(setup());
    waitFor(expect(getByText('Select Option')).toBeInTheDocument());
    const dropdown= screen.getByText('Select Option');
    waitFor(()=>{userEvent.mouseDown(dropdown)}); 
    screen.debug();
    waitFor(expect(screen.getByText('fragrances'))).toBeInTheDocument();
  })  


  //async-await not working hence used waitFor()
  test('should open modal', () => {
    render(setup());
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

const setup = () => {
  let store=configureStore(initialState,history);
  return <Provider store={store}><Product actions={actions} productDetails={undefined}/></Provider>;

}