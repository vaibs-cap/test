import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';

import NotFoundPage from '../NotFoundPage';

describe('<NotFoundPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(<NotFoundPage />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
