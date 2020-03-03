import React,{Component} from 'react';
import './App.css';
import Amplify, { Analytics, AWSKinesisFirehoseProvider } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure({
    Auth: {
        identityPoolId: config.aws_cognito_identity_pool_id, //'us-east-1:e229179a-244a-458c-87e8-055037463c0e',
        region: config.aws_project_region // 'us-east-1'
	},
	Analytics: {
		AWSKinesisFirehose: {
			region: config.aws_project_region //'us-east-1'
		} 
	}
});

Analytics.addPluggable(new AWSKinesisFirehoseProvider());

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			languages : [
				{name: "Php", votes: 0},
				{name: "Python", votes: 0},
				{name: "Go", votes: 0},
				{name: "Java", votes: 0},
				{name: "Javascript", votes: 0},
				{name: ".NET", votes: 0},
				{name: "Others", votes: 0}
			]
		}
	}

	vote (i) {
		let newLanguages = [...this.state.languages];
		newLanguages[i].votes++;
		function swap(array, i, j) {
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		this.setState({languages: newLanguages});

		const now = new Date();

		let data = {
			id : now.getTime(),
			language: newLanguages[i].name
		}

		Analytics.record({
			data: data,
			streamName: config.aws_firehose_name // 'serverless-analytics-demo'
		}, 'AWSKinesisFirehose');

	}

	render(){
		return(
			<>
				<h1>Vote Your Favorite Language!</h1>
				<div className="languages">
					{
						this.state.languages.map((lang, i) => 
							<div key={i} className="language">
								<div className="voteCount">
									{lang.votes}
								</div>
								<div className="languageName">
									{lang.name}
								</div>
								<button onClick={this.vote.bind(this, i)}>Click Here</button>
							</div>
						)
					}
				</div>
			</>
		);
	}
}
export default App;