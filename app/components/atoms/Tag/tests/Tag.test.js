import React from 'react';
import { shallow } from 'enzyme';
import { Tag } from '../Tag';

describe('<CustomCapTag />', () => {
  it('should render the CustomCapTag', () => {
    const renderedComponent = shallow(
      <Tag background="#ffff" font="18px" borderadius="18px" />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
