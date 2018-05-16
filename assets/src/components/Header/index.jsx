import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class Header extends Component {
  static propTypes = {
    handleShow: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    const { handleShow } = this.props;
    handleShow();
  };

  render() {
    return (
      <div>
        <div id='headerContainer' className='container-fluid'>
          <h4>Photo App</h4>

          <Button onClick={ this.handleClick } bsStyle="primary">
            Upload New Photo
          </Button>
        </div>
      </div>
    )
  };
};
