import React, { Component } from 'react';
import Header from '../../components/Header';
import AlertMessage from '../../components/AlertMessage';
import UploadModal from '../../components/UploadModal';
import { asyncRequest } from '../../api';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      list: null,
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
  };

  componentDidMount() {
    this.getPhotoList();
  };

  onModalShow() {
    this.setState({ showModal: true });
  };

  onModalClose() {
    this.setState({ showModal: false });
  };

  onError(error = 'Oh! Looks like a problem occurred...') {
    this.setState({
      error: true,
      errorMessage,
      info: false
    });
  };

  onMessage(message) {
    this.setState({
      info: true,
      infoMessage: message,
      error: false
    });
  };

  onAlertMessageClose() {
    this.setState({ info: false });
  };

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
        error: true
      });
    });
  };

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
          showAlert={ info }
          handleClose={ this.onAlertMessageClose }
        />

        <AlertMessage
          message={ errorMessage }
          showAlert={ error }
          handleClose={ this.onAlertErrorClose }
        />

        <UploadModal
          showModal={ showModal }
          handleClose={ this.onModalClose }
          handleError={ this.onError }
          handleMessage={ this.onMessage }
        />
      </div>
    )
  };
};
