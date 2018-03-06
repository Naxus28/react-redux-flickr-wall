import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * SearchBar presentational component
 * gets user input and passes it to 'handleSearchApi' inside 'App' component (callback)
 * 'handleSearchApi' dispatches 'searchPhotos(keyword)'
 */
export default class SearchBar extends Component {
  render() {
    let input;
    const { onClick } = this.props;

    return (
      <div className="form" ref="form">
        <input  
          type="text" 
          placeholder="Keyword"
          ref={node => input=node} 
        />
        <button onClick={()=> onClick(input.value)}>
          Search Images on Flickr
        </button>
      </div>
    )
  }
}

SearchBar.propTypes = {
  onClick: PropTypes.func
}