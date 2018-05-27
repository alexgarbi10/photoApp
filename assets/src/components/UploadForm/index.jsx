import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';

export default class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.validateName = this.validateName.bind(this);
    this.validateDescription = this.validateDescription.bind(this);
    this.validateFile = this.validateFile.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  // Custom form field validations
  validateName() {
    const { name } = this.props;
    const length = name.length;

    if (length === 0) {
      return null;
    }

    if (length > 0 && length < 40) {
      return 'success';
    }

    return 'error';
  }

  validateDescription() {
    const { description } = this.props;
    const length = description.length;

    if (length === 0) {
      return null;
    }

    if (length > 0 && length < 140) {
      return 'success';
    }

    return 'error';
  }

  validateFile() {
    const { file } = this.props;

    if (!file || !file.type || !file.size) {
      return null;
    }

    if (file.size > 5000000) {
      return 'error';
    }

    return 'success';
  }

  getValidationState(field) {
    if (field === 'name') {
      return this.validateName();
    }

    if (field === 'description') {
      return this.validateDescription();
    }

    if (field === 'file') {
      return this.validateFile();
    }

    return null;
  }

  onNameChange(e) {
    const name = e.target.value;
    const { handleNameChange } = this.props;
    handleNameChange(name);
  }

  onDescriptionChange(e) {
    const description = e.target.value;
    const { handleDescriptionChange } = this.props;
    handleDescriptionChange(description);
  }

  onFileChange(e) {
    const file = e.target.files[0];
    const { handleFileChange } = this.props;
    handleFileChange(file);
  }

  render() {
    const { name, description } = this.props;

    return (
      <div>
        <form>
          <FormGroup
            controlId='name'
            validationState={ this.getValidationState('name') }
          >
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type='text'
              value={ name }
              onChange={ this.onNameChange }
              placeholder='Enter photo name'
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup
            controlId="description"
            validationState={ this.getValidationState('description') }
          >
            <ControlLabel>Description</ControlLabel>
            <FormControl
              componentClass='textarea'
              value={ description }
              onChange={ this.onDescriptionChange }
              placeholder='Enter photo description'
            />
          </FormGroup>

          <FormGroup
            controlId='file'
            validationState={ this.getValidationState('file') }
          >
            <ControlLabel>File</ControlLabel>
            <FormControl
              type='file'
              onChange={ this.onFileChange }
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </div>
    );
  }
}

UploadForm.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  file: PropTypes.object,
  handleNameChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired
};
