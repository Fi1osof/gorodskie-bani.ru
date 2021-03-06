/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const compression = require('compression');

// const router = require('../routes/main');
import router from '../routes/main';

var cookieParser = require('cookie-parser');

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  // const fs = middleware.fileSystem;

  // app.get('*', (req, res) => {
  //   fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
  //     if (err) {
  //       res.sendStatus(404);
  //     } else {
  //       res.send(file.toString());
  //     }
  //   });
  // });
  
  app.use(new router({
    app: app,
    // webpack: compiler,
  }).router);
  
  // app.use(router({
  //   app: app,
  //   // webpack: compiler,
  // }));
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // console.log('outputPath', outputPath);

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  // console.log("app", app);
  // console.log("options", options);

  // app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));

  app.use(new router({
    app: app,
    // webpack: compiler,
  }).router);
  
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';


  app.use(cookieParser());

  // app.use(cookieParser())

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
