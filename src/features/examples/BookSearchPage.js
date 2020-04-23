import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class BookSearchPage extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const {
      hasPrevPage,
      hasNextPage,
      currentPage,
      totalElements,
      totalPages,
      searchBookPending,
      foundBooks,
      searchBookError,
    } = this.props.examples;
    const { searchBook, searchPreviousPage, searchNextPage } = this.props.actions;
    return (
      <div className="examples-book-search-page">
      <h2>Book libra &lt;/></h2>
        <div className="book-search-box">
          <input
            className="book-search-input"
            onChange={this.onChangeBound}
            onKeyPress={this.onEnterBound}
            placeholder="title, author..."
            type="text"
            value={this.props.examples.q}
          />
          <button className="book-search-btn" type="button" onClick={searchBook}>
            {searchBookPending ? 'Searching...' : 'Search'}
          </button>
        </div>

        {searchBookError && (
          <div className="fetch-list-error">Failed to load: {searchBookError.toString()}</div>
        )}
        {foundBooks.length > 0 ? (
          <div>
            <p>
              <i>
                Found total {totalElements} books in {totalPages} pages
              </i>
            </p>
            {foundBooks.map(item => (
              <div className="card-book" key={item.id}>
                <a>
                  <div className="book-title">{item.title}</div>
                </a>
                <div>
                  <a>
                    <span className="book-author">{item.author}</span>
                  </a>
                  &nbsp; &middot; &nbsp;
                  <a>
                    <span className="book-category">{item.category}</span>
                  </a>
                </div>
                <p className="book-desc">{item.shortDescription}</p>
              </div>
            ))}
            <p>
              {hasPrevPage && (
                <span>
                  <a onClick={searchPreviousPage}>
                    <span>Previous</span>
                  </a>{' '}
                  &nbsp; &middot; &nbsp;
                </span>
              )}
              <span>
                Page {currentPage} of {totalPages} pages
              </span>
              {hasNextPage && (
                <span>
                  &nbsp; &middot; &nbsp;
                  <a onClick={searchNextPage}>
                    <span>Next</span>
                  </a>
                </span>
              )}
            </p>
          </div>
        ) : (
          <div>
            <p>Let's search some book by title or author.</p>
          </div>
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    examples: state.examples,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookSearchPage);
