import React from 'react';
import { shallow } from 'enzyme';
import { ShowBook } from '../../../src/features/books/ShowBook';

describe('books/ShowBook', () => {
  it('renders node with correct class name', () => {
    const props = {
      books: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ShowBook {...props} />
    );

    expect(
      renderedComponent.find('.books-show-book').length
    ).toBe(1);
  });
});
