

module.exports = {
	  apps: [{
		      name: 'my-server',
		      script: 'server/server.js',
		      watch: true,
		      ignore_watch: ["node_modules", "client"]
		    }]
};

