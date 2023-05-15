import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Vote from './pages/Vote';
import Sentiment from './pages/Sentiment';

import { Amplify, Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify';
import awsExports from './aws-config';

Analytics.addPluggable(new AWSKinesisFirehoseProvider());

Amplify.configure(awsExports);

class App extends Component {
	render() {
		return (
			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Vote />} />

					<Route path="sentiment" element={<Sentiment />} />
				</Routes>
			</Router>
		);
	}
}
export default App;
