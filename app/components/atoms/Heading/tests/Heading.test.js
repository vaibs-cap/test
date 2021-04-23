import React from 'react';
import { shallow } from 'enzyme';
import { Heading } from '../Heading';

describe('<Heading />', () => {
  it('should render the Heading', () => {
    const renderedComponent = shallow(<Heading className="">header</Heading>);
    expect(renderedComponent).toMatchSnapshot();
  });
});
