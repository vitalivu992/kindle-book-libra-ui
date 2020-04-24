import React from 'react';
import { shallow } from 'enzyme';
import { WelcomePage } from '../../../src/features/books/WelcomePage';

describe('books/WelcomePage', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(<WelcomePage {...props} />);

    expect(renderedComponent.find('.books-welcome-page').length).toBe(1);
  });
});
