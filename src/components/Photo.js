import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * PhotoList presentational component
 */
export default class Photo extends Component {
  render() {
    const { photo } = this.props
    const imgURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

    return (
      <div className="imageWrapper">
        <a href={imgURL} target='_blank'>
        <img 
          src={imgURL} 
          alt={photo.title} 
          className="images"/>
      </a>
      </div>
    );
  }
};

Photo.propTypes = {
  photo: PropTypes.object.isRequired
};
