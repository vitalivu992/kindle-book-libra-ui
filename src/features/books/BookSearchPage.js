import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class BookSearchPage extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
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
    } = this.props.books;
    const { searchBook } = this.props.actions;
    // searchPreviousPage, searchNextPage
    const searchPreviousPage = () => {
      this.props.books.currentPage--;
      searchBook();
    };
    const searchNextPage = () => {
      this.props.books.currentPage++;
      searchBook();
    };
    return (
      <div className="books-book-search-page">
        <h2>Book libra &lt;/></h2>
        <div className="book-search-box">
          <input
            className="book-search-input"
            onChange={this.onChangeBound}
            onKeyPress={this.onEnterBound}
            placeholder="title, author..."
            type="text"
            value={this.props.books.q}
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
                Page {currentPage + 1} of {totalPages} pages
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
    books: state.books,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookSearchPage);
