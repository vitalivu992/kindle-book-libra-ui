import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../../../src/features/examples';

describe('books/Layout', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(<Layout />);

    expect(renderedComponent.find('.books-layout').length).toBe(1);
  });
});
