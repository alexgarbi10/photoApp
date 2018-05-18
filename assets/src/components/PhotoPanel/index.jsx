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
  }

  componentDidMount() {
    this.getImageData();
  }

  getImageData() {
    const { item } = this.props;
    const id = item.id;

    asyncRequest({
      path: `api/photo/download/${ id }`,
      method: 'get',
    }).then(body => {
      const url = URL.createObjectURL(body);
      this.setState({ src: url });
    }).catch(error => {
      console.log(error);
      // this.setState({
      //   error: true
      // });
    });
  }

  render() {
    const { item } = this.props;
    const { src } = this.state;

    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Photo { item.name }</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <img
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
  item: PropTypes.object.isRequired
};
