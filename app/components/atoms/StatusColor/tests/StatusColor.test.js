import React from 'react';
import { shallow } from 'enzyme';
import StatusColor from '..';

describe('<StatusColor />', () => {
  it('should render the StatusColor', () => {
    const renderedComponent = shallow(<StatusColor />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
