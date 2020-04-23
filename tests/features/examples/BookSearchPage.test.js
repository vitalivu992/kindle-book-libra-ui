import React from 'react';
import { shallow } from 'enzyme';
import { BookSearchPage } from '../../../src/features/examples/BookSearchPage';

describe('examples/BookSearchPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      examples: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <BookSearchPage {...props} />
    );

    expect(
      renderedComponent.find('.examples-book-search-page').length
    ).toBe(1);
  });
});
