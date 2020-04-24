import React from 'react';
import { shallow } from 'enzyme';
import { SearchPage } from '../../../src/features/books/SearchPage';

describe('books/SearchPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SearchPage {...props} />
    );

    expect(
      renderedComponent.find('.books-search-page').length
    ).toBe(1);
  });
});
