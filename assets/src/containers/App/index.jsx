import React, { Component } from 'react';
import Header from '../../components/Header';
import AlertMessage from '../../components/AlertMessage';
import UploadModal from '../../components/UploadModal';
import PhotoList from '../../components/PhotoList';
import { asyncRequest } from '../../api';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      photo: null,
      showDescription: false,
      showModal: false,
      error: false,
      errorMessage: '',
      info: false,
      infoMessage: ''
    };

    this.onModalShow = this.onModalShow.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onAlertMessageClose = this.onAlertMessageClose.bind(this);
    this.onAlertErrorClose = this.onAlertErrorClose.bind(this);
  }

  componentDidMount() {
    this.getPhotoList();
  }

  onModalShow() {
    this.setState({ showModal: true });
  }

  onModalClose() {
    this.setState({ showModal: false });
  }

  onError(error = 'Oh! Looks like a problem occurred...') {
    this.setState({
      error: true,
      errorMessage: error,
      info: false
    });
  }

  onMessage(message) {
    this.setState({
      info: true,
      infoMessage: message,
      error: false
    });
  }

  onAlertMessageClose() {
    this.setState({ info: false });
  }

  onAlertErrorClose() {
    this.setState({ error: false });
  }

  getPhotoList() {
    asyncRequest({
      path: `api/photo/list`,
      method: 'get',
    }).then(body => {
      this.setState({ list: body.list });
    }).catch(error => {
      this.setState({
        error: true,
        errorMessage: error.message || 'Oh! Looks like a problem occurred...'
      });
    });
  }

  render() {
    const {
      list,
      photo,
      showDescription,
      showModal,
      error,
      errorMessage,
      info,
      infoMessage
    } = this.state;

    return (
      <div>
        <Header
          showModal={ showModal }
          handleShow={ this.onModalShow }
        />

        <AlertMessage
          message={ infoMessage }
          show={ info }
          handleClose={ this.onAlertMessageClose }
        />

        <AlertMessage
          message={ errorMessage }
          show={ error }
          handleClose={ this.onAlertErrorClose }
        />

        <UploadModal
          show={ showModal }
          handleClose={ this.onModalClose }
          handleError={ this.onError }
          handleMessage={ this.onMessage }
        />

        <PhotoList
          list={ list }
        />
      </div>
    );
  }
}
