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
      <div className="books-side-panel">
        <ul>
          <li>
            <Link to="/books">Welcome</Link>
          </li>
          <li>
            <Link to="/books/search">Search page</Link>
          </li>
          <li>
            <Link to="/">Back to start page</Link>
          </li>
        </ul>
        <div className="memo">
          This is a Rekit feature that contains some example for you to quick learn how Rekit works. To remove it just
          delete the feature.
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
