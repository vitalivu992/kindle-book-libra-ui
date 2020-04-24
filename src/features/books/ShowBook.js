import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class ShowBook extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { selectedId } = this.props.books;
    const { getBook } = this.props.actions;

    if (selectedId) {
      getBook();
    }
  }

  render() {
    const { getBookPending, getBookError, book } = this.props.books;

    return (
      <div className="books-show-book">
        {getBookPending && <div className="get-book-pending">Waiting</div>}
        {getBookError && (
          <div className="get-book-error">Failed to get book: {getBookError.toString()}</div>
        )}
        {book && (
          <div className="card-book" key={book.id}>
            <a>
              <div className="book-title">{book.title}</div>
            </a>
            <div>
              <a>
                <span className="book-author">{book.author}</span>
              </a>
              &nbsp; &middot; &nbsp;
              <a>
                <span className="book-category">{book.category}</span>
              </a>
            </div>
            <p className="book-desc">{book.shortDescription}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowBook);
