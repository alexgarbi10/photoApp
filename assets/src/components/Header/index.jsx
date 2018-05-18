import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, PageHeader } from 'react-bootstrap';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { handleShow } = this.props;
    handleShow();
  }

  render() {
    return (
      <div>
        <PageHeader>
          <div
            id='header-container'
            className='container-fluid'
          >
            <h4 className='header-title'>Photo App</h4>

            <Button
              onClick={ this.handleClick }
              className='header-button'
              bsStyle='primary'
            >
              Upload New Photo
            </Button>
          </div>
        </PageHeader>;
      </div>
    );
  }
}

Header.propTypes = {
  handleShow: PropTypes.func.isRequired
};
