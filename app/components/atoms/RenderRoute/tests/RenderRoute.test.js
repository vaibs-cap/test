import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { RenderRoute } from '../RenderRoute';
import Heading from '../../Heading';

describe('<RenderRoute />', () => {
  it('should render the RenderRoute', () => {
    const renderedComponent = mount(
      <MemoryRouter initialEntries={['/']}>
        <RenderRoute path="/" component={Heading} />
      </MemoryRouter>,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
