import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import registerServiceWorker from 'registerServiceWorker';

import './css/styles.css';

/**
 * Store
 */
const store = configureStore();

/**
 * Render
 */
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();

