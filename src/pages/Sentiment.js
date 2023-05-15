import React, { Component } from 'react';
import { Analytics } from 'aws-amplify';

class SentimentVote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sentiments: [
				{ name: 'Im so happy', votes: 0 },
				{ name: 'This is great', votes: 0 },
				{ name: 'This is awful', votes: 0 },
				{ name: 'Very helpful', votes: 0 },
				{ name: 'Im frustrated', votes: 0 },
				{ name: 'Hello', votes: 0 },
				{ name: 'I have a problem', votes: 0 },
				{ name: 'Can you help me', votes: 0 },
			],
		};
	}

	vote(i) {
		let newSentiments = [...this.state.sentiments];
		newSentiments[i].votes++;
		function swap(array, i, j) {
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		this.setState({ sentiments: newSentiments });

		const now = new Date();

		let data = {
			id: now.getTime(),
			language: newSentiments[i].name,
		};

		Analytics.record(
			{
				data: data,
				streamName: `${process.env.REACT_APP_FIREHOSE_SENTIMENT_NAME}`,
			},
			'AWSKinesisFirehose'
		);
	}

	render() {
		return (
			<>
				<h1>Send Sentiment to the Backend!</h1>
				<div className="languages">
					{this.state.sentiments.map((sent, i) => (
						<div key={i} className="language">
							<div className="voteCount">{sent.votes}</div>
							<div className="sentimentName">{sent.name}</div>
							<button onClick={this.vote.bind(this, i)}>Click Here</button>
						</div>
					))}
				</div>
			</>
		);
	}
}
export default SentimentVote;
