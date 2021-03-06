import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

export class SearchPage extends Component {
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

    const searchPreviousPage = () => {
      this.props.books.currentPage--;
      searchBook();
    };
    const searchNextPage = () => {
      this.props.books.currentPage++;
      searchBook();
    };
    const searchReset = () => {
      this.props.books.currentPage=0;
      searchBook();
    };

    const handleChange = event => {
      this.props.books.q = event.target.value;
    };
    const selectBook = (e, id) => {
      this.props.books.selectedId = id;
    };
    return (
      <div className="books-search-page">
        <h2>Book libra &lt;/></h2>
        <div className="book-search-box">
          <Form>
            <Form.Field onChange={handleChange}>
              <input placeholder="title, author..." name="q" />
            </Form.Field>
            <Button type="submit" onClick={searchReset}>
              {searchBookPending ? 'Searching...' : 'Search'}
            </Button>
          </Form>
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
                <Link to={'/books/show'}>
                  <div className="book-title" id={item.id} onClick={e => selectBook(e, item.id)}>
                    {item.title}
                  </div>
                </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
