import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';

export default class AlertMessage extends Component {
  constructor(props) {
    super(props);

    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleDismiss() {
    const { handleClose } = this.props;
    handleClose();
  }

  render() {
    const { show, message, error } = this.props;
    const classValue = error ? 'warning' : 'success';

    if (show) {
      return (
        <div>
          <Alert
            onDismiss={this.handleDismiss}
            className='text-center'
            bsStyle={ classValue }
          >
            <h4>{ message }</h4>
            <p>
              Duis mollis, est non commodo luctus,
              nisi erat porttitor ligula,
              eget lacinia odio sem nec elit.
              Cras mattis consectetur purus sit amet fermentum.
            </p>
            <p>
              <Button onClick={this.handleDismiss}>Hide</Button>
            </p>
          </Alert>
        </div>
      );
    }

    return null;
  }
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};
