module.exports = {
  apps : [{
    name   : "app1",
    script : "./server/server.ts",
	  interpreter: 'node',
	    interpreter_args: '--import tsx',
  }]
}
