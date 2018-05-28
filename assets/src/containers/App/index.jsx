import React, { Component } from 'react';
import Header from '../../components/Header';
import AlertMessage from '../../components/AlertMessage';
import UploadModal from '../../components/UploadModal';
import PhotoList from '../../components/PhotoList';
import { asyncRequest } from '../../api';
import '../../../styles/app.scss';

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
    this.onDetailOpen = this.onDetailOpen.bind(this);
    this.onDetailClose = this.onDetailClose.bind(this);
    this.getPhotoList = this.getPhotoList.bind(this);
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
      error: false,
      info: true,
      infoMessage: message
    });
  }

  onAlertMessageClose() {
    this.setState({ info: false });
  }

  onAlertErrorClose() {
    this.setState({ error: false });
  }

  onDetailOpen(item) {
    console.log(item);

    this.setState({
      photo: item,
      showDescription: true
    });
  }

  onDetailClose() {
    this.setState({ showDescription: false });
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
          error={ false }
          handleClose={ this.onAlertMessageClose }
        />

        <AlertMessage
          message={ errorMessage }
          show={ error }
          error={ true }
          handleClose={ this.onAlertErrorClose }
        />

        <UploadModal
          show={ showModal }
          handleClose={ this.onModalClose }
          handleError={ this.onError }
          handleMessage={ this.onMessage }
          handleSuccess={ this.getPhotoList }
        />

        <PhotoList
          list={ list }
          show={ showDescription }
          item={ photo }
          handleOpen={ this.onDetailOpen }
          handleClose={ this.onDetailClose }
          handleError={ this.onError }
        />
      </div>
    );
  }
}
