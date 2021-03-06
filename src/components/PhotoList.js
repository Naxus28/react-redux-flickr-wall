import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo';

/**
 * PhotoList presentational component
 */
export default class PhotoList extends Component {
  render() {
    const { photos, keyword } = this.props;

    return(
      <article> 
        {!keyword 
          ? <h3 className='getRecent_header'>Showing results from getRecent API</h3>
          : <h3 className="searchPhotos_header">Showing results for {keyword}</h3>
        }
        {photos.map((photo, index) =>
          <Photo 
            key={index} 
            photo={photo} />
        )}
      </article>
    );
  }
};

PhotoList.propTypes = {
  photos: PropTypes.array.isRequired,
  keyword: PropTypes.string
};


