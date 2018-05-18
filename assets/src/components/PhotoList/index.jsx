import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoPanel from '../../components/PhotoPanel';

export default class PhotoList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  };

  render() {
    const { list } = this.props;

    return (
      <div>
        { list.length > 0 &&
          <div>
            <h2 className='text-center'>
              There are {list.length} uploaded photos.
            </h2>

            <div>
              {
                list.map(
                  (item) => {
                    return <PhotoPanel item={ item } key={ item.id } />;
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
    )
  };
};
