
import React from "react";
import { render, waitFor,screen, fireEvent, cleanup} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import * as actions from '../actions';
import {ProductAdd} from "../ProductAdd";

const mockPush= jest.fn();
jest.mock('../ProductAdd', () => ({
  ...jest.requireActual('../ProductAdd'),
  push: mockPush,
}));

jest.setTimeout(30000);


describe('ProductAdd Component Tests', () => {

    test('should render the components', async() => {
      render(<ProductAdd actions={actions} newProductDetails={{}}/>);
    //   screen.debug();
      const addBtn= await screen.getByRole('button', {
        name: /submit/i
      })
      expect(addBtn).toBeInTheDocument();
      checkAvailable("title");
      checkAvailable("description");
      checkAvailable("brand");
      checkAvailable("category");
      checkAvailable("price");
      checkAvailable("stock");
    })
    
    test('should enable button when fields are filled', async() => {
        render(<ProductAdd actions={actions} newProductDetails={{}}/>);
      //   screen.debug();
        const addBtn= await screen.getByRole('button', {
          name: /submit/i
        })
        expect(addBtn).toBeInTheDocument();
        typeText("title","text");
        expect(addBtn).toBeDisabled();
        typeText("description","text");
        expect(addBtn).toBeDisabled();
        typeText("brand","text");
        expect(addBtn).toBeDisabled();
        typeText("category","text");
        expect(addBtn).toBeDisabled();
        typeText("price","text");
        expect(addBtn).toBeDisabled();
        typeText("stock","text");  
        waitFor(()=>expect(addBtn).toBeEnabled())
    })

    test('should render success form', async() => {
        render(<ProductAdd actions={actions} newProductDetails={{}}/>);
        const addBtn= await screen.findByRole('button', {
            name: /submit/i
        })
        expect(addBtn).toBeInTheDocument();
        typeText("title","text");
        typeText("description","text");
        typeText("brand","text");
        typeText("category","text");
        typeText("price","text");
        typeText("stock","text");  
        await waitFor(()=>expect(addBtn).toBeEnabled());
        await userEvent.click(addBtn);
        waitFor(()=>expect(screen.getByPlaceholderText(`Enter title`)).toHaveValue(""));
        // const notif =  await screen.findAllByText('New Product Added Successfully');
        // expect(notif[0]).toBeInTheDocument();

        
    })
    
    test('should redirect to homepage', async() => {
        render(<ProductAdd actions={actions} newProductDetails={{}}/>);
        const backBtn= await screen.findByRole('button', {
            name: /go back/i
          })
          expect(backBtn).toBeInTheDocument();
          await userEvent.click(backBtn);
          waitFor(()=>expect(mockPush).toHaveBeenCalled());
    })
    
  
} )

const typeText= async (element,text) =>{
    const field=await screen.findByPlaceholderText(`Enter ${element}`)
    expect(field).toBeInTheDocument();
    userEvent.type(field,text);
}

const checkAvailable = async(element) =>{
    const field=await screen.findByPlaceholderText(`Enter ${element}`)
    expect(field).toBeInTheDocument();
}