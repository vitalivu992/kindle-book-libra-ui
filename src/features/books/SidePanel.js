import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SidePanel extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <div className="books-side-panel">
          <ul>
            <li>
              <Link to="/books">Search for books</Link>
            </li>
            <li>
              <Link to="/books/show">Show a book</Link>
            </li>
            <li>
              <Link to="/">All category</Link>
            </li>
            <li>
              <Link to="/">Tâm Lý - Kỹ Năng Sống</Link>
            </li>
            <li>
              <Link to="/">Triết Học</Link>
            </li>
            <li>
              <Link to="/">Khoa Học - Kỹ Thuật</Link>
            </li>
          </ul>
          <div className="memo">NÊN sao chép, chia sẻ, KHÔNG NÊN thương mại hoá
          <hr />
            <i>
              Một dự án phi lợi nhuận,nhằm mục đích chia sẻ sách và đọc truyện online miễn phí vì cộng
            đồng.
          </i>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
