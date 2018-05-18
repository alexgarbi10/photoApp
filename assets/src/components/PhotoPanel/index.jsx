import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { asyncRequest } from '../../api';

export default class PhotoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: ''
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.getImageData();
  }

  onClick() {
    const { item, handleOpen } = this.props;
    handleOpen(item);
  }

  getImageData() {
    const { item, handleError } = this.props;
    const id = item.id;

    asyncRequest({
      path: `api/photo/download/${ id }`,
      method: 'get',
    }).then(body => {
      const url = URL.createObjectURL(body);
      this.setState({ src: url });
    }).catch(error => {
      handleError(error.message);
    });
  }

  render() {
    const { item } = this.props;
    const { src } = this.state;

    return (
      <div>
        <Panel className='photo-panel' bsStyle='primary'>
          <Panel.Heading>
            <Panel.Title componentClass='h3'>Photo { item.name }</Panel.Title>
          </Panel.Heading>
          <Panel.Body className='photo-panel-body'>
            <img
              onClick={ this.onClick }
              src={ src }
              alt={ item.name }
              className='photo-thumbnail'
            >
            </img>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

PhotoPanel.propTypes = {
  item: PropTypes.object.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired
};
