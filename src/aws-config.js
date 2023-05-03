const awsconfig = {
	Auth: {
		identityPoolId: `${process.env.REACT_APP_IDENTITY_POOL_ID}`,
		region: `${process.env.REACT_APP_REGION}`,
	},
	Analytics: {
		AWSKinesisFirehose: {
			region: `${process.env.REACT_APP_REGION}`,
			bufferSize: 1,
			//  The number of events to be deleted from the buffer when flushed.
			flushSize: 1,

			// The interval in milliseconds to perform a buffer check and flush if necessary.
			flushInterval: 1000, // 1s
		},
	},
};

export default awsconfig;
