import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Panel } from 'react-bootstrap';
import { asyncRequest } from '../../api';

export default class PhotoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: ''
    };

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.renderRegular = this.renderRegular.bind(this);
    this.renderExpanded = this.renderExpanded.bind(this);
  }

  componentDidMount() {
    this.getImageData();
  }

  onOpen() {
    const { item, handleOpen } = this.props;
    handleOpen(item);
  }

  onClose() {
    const { handleClose } = this.props;
    handleClose();
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

  renderRegular() {
    const { item } = this.props;
    const { src } = this.state;

    const panel = <div>
      <Panel
        className='photo-panel'
        bsStyle='primary'
      >
        <Panel.Heading>
          <Panel.Title componentClass='h3'>Photo { item.name }</Panel.Title>
        </Panel.Heading>
        <Panel.Body className='photo-panel-body'>
          <img
            onClick={ this.onOpen }
            src={ src }
            alt={ item.name }
            className='photo-thumbnail'
          >
          </img>
        </Panel.Body>
      </Panel>
    </div>;

    return panel;
  }

  renderExpanded() {
    const { item } = this.props;
    const { src } = this.state;

    const panel = <div>
      <Panel className='photo-panel-expanded' bsStyle='primary'>
        <Panel.Heading>
          <Panel.Title componentClass='h3'>Photo { item.name }</Panel.Title>
        </Panel.Heading>
        <Panel.Body className='photo-panel-body-expanded'>
          <img
            src={ src }
            alt={ item.name }
            className='photo-thumbnail-expanded'
          >
          </img>
          <p className='created-at'>
            File created @: { item.createdAt }
          </p>
          <p className='description'>
            { item.description }
          </p>
          <Button onClick={ this.onClose } >
            Close
          </Button>
        </Panel.Body>
      </Panel>
    </div>;

    return panel;
  }

  render() {
    const { expanded } = this.props;

    if (expanded) {
      return this.renderExpanded();
    } else {
      return this.renderRegular();
    }
  }
}

PhotoPanel.propTypes = {
  item: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  handleError: PropTypes.func.isRequired
};
