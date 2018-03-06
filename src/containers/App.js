import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchPhotos, fetchPhotos } from '../actions/index'
import PhotoList from '../components/PhotoList'
import SearchBar from '../components/SearchBar'

/**
 * App Container Component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchApi = this.handleSearchApi.bind(this);
  }

  // dispatch action on page load
  // because there is no keyword at this point, app fetches 'getRecent' API
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(fetchPhotos());
  }

  // dispatch action if this.props !== nexProps
  // meaning, if the new keyword is different than the previous keyword
  componentWillReceiveProps(nextProps) { 
    if (nextProps.keyword !== this.props.keyword) {
      const { dispatch, keyword } = nextProps;
      dispatch(fetchPhotos(keyword));
    }
  }

  // dispatch action when user performs a search
  // changes the state of the 'keyword' reducer 
  handleSearchApi(keyword){
    const { dispatch } = this.props
    dispatch(searchPhotos(keyword));
  }

  // react render method
  render(){
    const { flickrPhotos, keyword } = this.props;

    return(
      <div>

      {/* if app is about to start fetching API */}
      { flickrPhotos.isFetching &&
        <div className="loadingWrapper">
          <h2 className="loading">Loading Photos...</h2>
          <p className="spinner"><i className="fa fa-4x fa-spinner fa-spin" /></p>
        </div>
      }

      {/* if API was fetched and returned an error */}
      { flickrPhotos.apiError &&
        <div className="errorMessageWrapper">
          <p className="apiError">{flickrPhotos.errorMessage}</p>
        </div>
      }

      {/* if API was fetched but there are no results */}
      { !flickrPhotos.isFetching &&
        flickrPhotos.photos.length === 0 &&
        !flickrPhotos.apiError &&
        <div className="loadingWrapper">
          <h2 className="loading">No results for {keyword}</h2>
        </div>
      }

      {/* if API was fetched and there are results */}
      { !flickrPhotos.isFetching &&
        flickrPhotos.photos.length > 0 &&
        <div>
          <h2 className='header'>Flickr Photo Wall</h2>
          <PhotoList photos={flickrPhotos.photos} keyword={keyword} />
          <SearchBar onClick={this.handleSearchApi} />
        </div>
      }

      {/* if API was fetched and there are no errors--there may or may not be results */}
      { !flickrPhotos.isFetching && 
        !flickrPhotos.apiError &&
        <div>
          <SearchBar onClick={this.handleSearchApi} />
        </div>
      }
      
      </div>
    );
  }
}


/**
 * Map State to Props
 * returns the state of the app and passes it as props to the 'App' component
 * via the 'connect' function
 */
const mapStateToProps = (state) => {
  return {
    flickrPhotos: state.flickrPhotos,
    keyword: state.keyword
  }
}

export default connect(mapStateToProps)(App);