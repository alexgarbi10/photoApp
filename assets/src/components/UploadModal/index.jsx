import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import UploadForm from '../UploadForm';
import { asyncRequest } from '../../api';

export default class UploadModal extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      file: {}
    };

    this.onClose = this.onClose.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onClose() {
    const { handleClose } = this.props;
    handleClose();
  };

  onNameChange(name) {
    this.setState({ name: name });
  };

  onDescriptionChange(description) {
    this.setState({ description: description });
  };

  onFileChange(file) {
    this.setState({ file: file});
  };

  onSubmit() {
    console.log(this.state);
  };

  getPhotoList() {
    const { name, description, file } = this.state;

    if (
      name !== ''
      && description !== ''
      && file.hasOwnProperty('type')
      && file.hasOwnProperty('size')
    ) {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('file', file);

      asyncRequest({
        path: `api/photo/upload`,
        method: 'post',
        body: formData,
        cType: 'multipart/form-data'
      }).then(body => {
        console.log(body);
      }).catch(error => {
        console.log(error);
      });
    }
  };

  render() {
    const { showModal } = this.props;
    const { name, description, file } = this.state;

    return (
      <div>
        <Modal show={ showModal } onHide={ this.onClose }>
          <Modal.Header closeButton>
            <Modal.Title>New Photo Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <UploadForm
              name={ name }
              description={ description }
              file={ file }
              handleNameChange={ this.onNameChange }
              handleDescriptionChange={ this.onDescriptionChange }
              handleFileChange={ this.onFileChange }
            />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ this.onClose }>
              Close
            </Button>
            <Button onClick={ this.onSubmit } bsStyle="primary">
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  };
};
