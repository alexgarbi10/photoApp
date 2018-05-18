import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoPanel from '../../components/PhotoPanel';

export default class PhotoList extends Component {
  constructor(props) {
    super(props);

    this.renderPanel = this.renderPanel.bind(this);
    this.renderExpandedPanel = this.renderExpandedPanel.bind(this);
  }

  renderPanel(item) {
    const { handleOpen, handleError } = this.props;

    const panel = <PhotoPanel
      item={ item }
      key={ item.id }
      expanded={ false }
      handleOpen={ handleOpen }
      handleError={ handleError }
    />;
    return panel;
  }

  renderExpandedPanel(item) {
    const { handleClose, handleError } = this.props;

    const panel = <PhotoPanel
      item={ item }
      key={ item.id }
      expanded={ true }
      handleClose={ handleClose }
      handleError={ handleError }
    />;
    return panel;
  }

  render() {
    const { list, show, item } = this.props;

    if (show) {
      return this.renderExpandedPanel(item);
    }

    return (
      <div>
        { list.length > 0 &&
          <div>
            <h2 className='text-center'>
              There are {list.length} uploaded photos.
            </h2>

            <div className='photo-list-container'>
              {
                list.map(
                  (item) => {
                    return this.renderPanel(item);
                  }
                )
              }
            </div>
          </div>
        }
        { list.length === 0 &&
          <h2 className='text-center'>
            Upload your first photo!
          </h2>
        }
      </div>
    );
  }
}

PhotoList.propTypes = {
  list: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
  item: PropTypes.object,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired
};
