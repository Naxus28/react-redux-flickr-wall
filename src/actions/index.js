import fetch from 'isomorphic-fetch';

/**
 * Action Types
 */
export const API_CALL_FAIL      = 'API_CALL_FAIL';
export const PROCESSING_PHOTOS 	= 'PROCESSING_PHOTOS';
export const RECEIVE_PHOTOS     = 'RECEIVE_PHOTOS';
export const SEARCH_PHOTOS      = 'SEARCH_PHOTOS';


/**
 * Action Creators
 */

 /**
  * dispatched from 'App' component in two scenarios:
  * 1. inside 'componentDidMount' when the page first loads and
  * 2. inside 'componenteWillReceiveProps' if there is a search and 
  * the new keyword is different than the previous one
  */
 export const fetchPhotos = (keyword) => {
  return dispatch => {
    // inform UI that an API request is about to be sent
    dispatch(processingPhotos());
    
     let api = keyword
                ? `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=cdb1c21715473a661cbfe89023718ab2&tags=${keyword}&text=${keyword}&format=json&nojsoncallback=1`
                : `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=cdb1c21715473a661cbfe89023718ab2&format=json&nojsoncallback=1`

    return fetch(api)
      .then(response => response.json())
      .then(data => dispatch(receivePhotos(data)));
  };
 };

/**
 * dispatched just before we start fetching photos from the API
 * flags 'isFetching' to true
 * informs UI that it should display a 'is loading' message and a spinner
 */
const processingPhotos = () => {
	return {
		type: PROCESSING_PHOTOS
	};
};

/**
 * dispatched within 'fetchPhotos', after the API is fetched
 * receives the data from the API and sets the new object for 
 * reducer 'receivedPhotos' according to the data received
 */
const receivePhotos = (data) => {
  //if there is no error set the photos obj
  if (data.stat !== 'fail') {
    return {
      type: RECEIVE_PHOTOS,
      photos: data.photos.photo
    };
  }

  //if there is an error set the error message
  else {
    return {
      type: API_CALL_FAIL,
      message: data.message
    };
  }
};

/**
 * dispatched when there is a search
 * sets the new state of the 'keywordInput' reducer
 * 'keywordInput' state (meaning the keyword) is passed as props into 'App' component
 * react's 'componenteWillReceiveProps' compares the new props (new keyword) with the previous prop (previous keyword)
 * if they are different, 'fetchPhotos(keyword)' is dispatched to pull new photos from Flickr
 */
export const searchPhotos = (keyword) => {
	return {
		type: SEARCH_PHOTOS,
		keyword
	};
};
