import React from 'react';
import { shallow } from 'enzyme';
import { SidePanel } from '../../../src/features/books/SidePanel';

describe('books/SidePanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(<SidePanel {...props} />);

    expect(renderedComponent.find('.books-side-panel').length).toBe(1);
  });
});
