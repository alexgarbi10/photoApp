import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import UploadForm from '../UploadForm';
import { asyncRequest } from '../../api';

export default class UploadModal extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    handleMessage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      file: null
    };

    this.onClose = this.onClose.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
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
    this.setState({ file: file });
  };

  onSubmit() {
    const { name, description, file } = this.state;

    if (!file) {
      return;
    }

    if (name !== '' && description !== '') {
      this.onFileUpload();
    }
  };

  onFileUpload() {
    const { handleError, handleMessage } = this.props;
    const { name, description, file } = this.state;

    var data = new FormData(file);
    data.append('name', name);
    data.append('description', description);
    data.append('attachment', file);

    asyncRequest({
      path: `api/photo/upload`,
      method: 'post',
      body: data,
      cType: 'multipart/form-data'
    }).then(body => {
      this.onClose();
      handleMessage(body.message);
    }).catch(error => {
      this.onClose();
      handleError(error.message);
    });
  };

  render() {
    const { showModal } = this.props;
    const { name, description, file } = this.state;

    return (
      <div>
        <Modal
          show={ showModal }
          onHide={ this.onClose }
        >
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
            <Button
              onClick={ this.onSubmit }
              bsStyle='primary'
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  };
};
