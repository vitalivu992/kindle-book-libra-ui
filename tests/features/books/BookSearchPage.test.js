import React from 'react';
import { shallow } from 'enzyme';
import { BookSearchPage } from '../../../src/features/books/BookSearchPage';

describe('books/BookSearchPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <BookSearchPage {...props} />
    );

    expect(
      renderedComponent.find('.books-book-search-page').length
    ).toBe(1);
  });
});
