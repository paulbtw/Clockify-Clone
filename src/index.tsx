import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';
import 'rsuite/dist/styles/rsuite-default.css';

render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);
