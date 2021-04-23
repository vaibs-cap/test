import React from 'react';
import { shallow } from 'enzyme';
import { AvatarIcon } from '../AvatarIcon';

describe('<AvatarIcon />', () => {
  it('should render the AvatarIcon', () => {
    const renderedComponent = shallow(<AvatarIcon />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
