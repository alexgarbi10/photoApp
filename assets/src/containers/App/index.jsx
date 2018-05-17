import React, { Component } from 'react';
import Header from '../../components/Header';
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
      msg: null
    };

    this.onModalShow = this.onModalShow.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
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

  getPhotoList() {
    asyncRequest({
      path: `api/photo/list`,
      method: 'get',
    }).then(body => {
      this.setState({ list: body.list });
    }).catch(error => {
      this.setState({
        error: true,
        msg: error.uiText
      });
    });
  };

  render() {
    const {
      list,
      photo,
      error,
      msg,
      showDescription,
      showModal
    } = this.state;

    return (
      <div>
        <Header
          showModal={ showModal }
          handleShow={ this.onModalShow }
        />

        <UploadModal
          showModal={ showModal }
          handleClose={ this.onModalClose }
        />
      </div>
    )
  };
};
